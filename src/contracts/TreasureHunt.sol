// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract TreasureHunt is ERC721, ReentrancyGuard, Ownable, Pausable {
    using Counters for Counters.Counter;
    using ECDSA for bytes32;

    // Constants
    uint256 public constant MESSAGE_PRICE = 0.003 ether;
    uint256 public constant BUNDLE_SIZE = 5;
    uint256 public constant BUNDLE_PRICE = 0.015 ether;
    uint256 public constant MINIMUM_TREASURY = 1 ether;
    uint256 public constant AUCTION_DURATION = 5 minutes;
    uint256 public constant AUCTION_EXTENSION = 60 seconds;
    
    // Structures
    struct Auction {
        uint256 startTime;
        uint256 endTime;
        uint256 highestBid;
        address highestBidder;
        bool active;
        uint256 minBidIncrement;
        mapping(address => uint256) bids;
        address[] bidders;
    }

    struct DigRecord {
        uint256 timestamp;
        bytes32 treasureHuntId;
    }

    struct TreasuryStats {
        uint256 totalInflow;
        uint256 totalOutflow;
        uint256 lastDistributionTime;
        uint256 distributionsCount;
    }

    // State variables
    Counters.Counter private _tokenIds;
    mapping(address => uint256) public messageCredits;
    mapping(address => uint256) public pendingReturns;
    mapping(address => DigRecord[]) public digHistory;
    mapping(bytes32 => address[]) public treasureHuntDiggers;
    mapping(uint256 => bool) public tokenBurned;
    mapping(bytes32 => bool) public usedSignatures;
    
    uint256 public treasuryPool;
    bytes32 public currentTreasureHuntId;
    address public teeAgentAddress;
    address public foundersAddress;
    Auction public currentAuction;
    TreasuryStats public treasuryStats;

    // Events
    event MessageSent(address indexed sender, uint256 cost);
    event BundlePurchased(address indexed buyer, uint256 amount);
    event AuctionStarted(uint256 startTime, uint256 endTime, uint256 minBid);
    event BidPlaced(address indexed bidder, uint256 amount, uint256 newEndTime);
    event AuctionExtended(uint256 newEndTime);
    event ShovelMinted(address indexed winner, uint256 tokenId);
    event TreasureFound(address indexed finder, uint256 reward);
    event RewardDistributed(address indexed digger, uint256 amount);
    event DigAttempted(address indexed digger, bytes32 indexed huntId);

    constructor(
        address _foundersAddress,
        address _teeAgentAddress
    ) ERC721("TreasureHuntShovel", "SHOVEL") {
        foundersAddress = _foundersAddress;
        teeAgentAddress = _teeAgentAddress;
        currentTreasureHuntId = keccak256(abi.encodePacked(block.timestamp));
        startNewAuction();
    }

    // Modifiers
    modifier onlyTEE() {
        require(msg.sender == teeAgentAddress, "Only TEE Agent");
        _;
    }

    modifier onlyDuringAuction() {
        require(currentAuction.active, "No active auction");
        require(block.timestamp < currentAuction.endTime, "Auction ended");
        _;
    }

    modifier withMinimumTreasury() {
        require(treasuryPool >= MINIMUM_TREASURY, "Treasury below minimum");
        _;
    }

    // Message and Bundle Management
    function sendMessage() external payable whenNotPaused {
        if (messageCredits[msg.sender] > 0) {
            messageCredits[msg.sender]--;
        } else {
            require(msg.value == MESSAGE_PRICE, "Incorrect message payment");
            treasuryPool += msg.value;
            treasuryStats.totalInflow += msg.value;
        }
        emit MessageSent(msg.sender, msg.value);
    }

    function buyMessageBundle() external payable whenNotPaused {
        require(msg.value == BUNDLE_PRICE, "Incorrect bundle payment");
        messageCredits[msg.sender] += BUNDLE_SIZE;
        treasuryPool += msg.value;
        treasuryStats.totalInflow += msg.value;
        emit BundlePurchased(msg.sender, BUNDLE_SIZE);
    }

    // Auction Management
    function startNewAuction() internal {
        require(!currentAuction.active, "Auction already active");
        
        delete currentAuction.bidders;
        currentAuction = Auction({
            startTime: block.timestamp,
            endTime: block.timestamp + AUCTION_DURATION,
            highestBid: 0,
            highestBidder: address(0),
            active: true,
            minBidIncrement: 0.001 ether
        });

        emit AuctionStarted(
            currentAuction.startTime,
            currentAuction.endTime,
            currentAuction.minBidIncrement
        );
    }

    function placeBid() external payable onlyDuringAuction nonReentrant whenNotPaused {
        require(msg.value > 0, "Bid must be > 0");
        require(
            msg.value >= currentAuction.highestBid + currentAuction.minBidIncrement,
            "Bid too low"
        );

        if (currentAuction.bids[msg.sender] == 0) {
            currentAuction.bidders.push(msg.sender);
        }
        currentAuction.bids[msg.sender] += msg.value;

        if (currentAuction.bids[msg.sender] > currentAuction.highestBid) {
            currentAuction.highestBid = currentAuction.bids[msg.sender];
            currentAuction.highestBidder = msg.sender;
        }

        if (block.timestamp > currentAuction.endTime - AUCTION_EXTENSION) {
            currentAuction.endTime += AUCTION_EXTENSION;
            emit AuctionExtended(currentAuction.endTime);
        }

        emit BidPlaced(msg.sender, msg.value, currentAuction.endTime);
    }

    function finalizeAuction() external nonReentrant whenNotPaused {
        require(currentAuction.active, "No active auction");
        require(block.timestamp >= currentAuction.endTime, "Auction not ended");

        address winner = currentAuction.highestBidder;
        uint256 winningBid = currentAuction.highestBid;

        // Refund other bidders
        for (uint256 i = 0; i < currentAuction.bidders.length; i++) {
            address bidder = currentAuction.bidders[i];
            if (bidder != winner && currentAuction.bids[bidder] > 0) {
                uint256 refundAmount = currentAuction.bids[bidder];
                currentAuction.bids[bidder] = 0;
                
                (bool success, ) = payable(bidder).call{value: refundAmount}("");
                if (success) {
                    emit RewardDistributed(bidder, refundAmount);
                }
            }
        }

        // Distribute winning bid
        if (winner != address(0)) {
            uint256 foundersShare = (winningBid * 10) / 100;
            uint256 treasuryShare = winningBid - foundersShare;

            treasuryPool += treasuryShare;
            treasuryStats.totalInflow += treasuryShare;
            
            (bool success, ) = payable(foundersAddress).call{value: foundersShare}("");
            require(success, "Founders payment failed");

            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _safeMint(winner, newTokenId);
            
            emit ShovelMinted(winner, newTokenId);
        }

        currentAuction.active = false;
        startNewAuction();
    }

    // Treasure Hunt Management
    function verifyAndDistributeReward(
        address finder,
        uint256 shovelId,
        bytes memory signature
    ) external onlyTEE nonReentrant whenNotPaused {
        require(_exists(shovelId), "Shovel doesn't exist");
        require(ownerOf(shovelId) == finder, "Not shovel owner");
        require(!tokenBurned[shovelId], "Shovel already burned");
        
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                currentTreasureHuntId,
                finder,
                shovelId,
                block.chainid
            )
        );
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedMessageHash.recover(signature);
        require(recoveredSigner == teeAgentAddress, "Invalid signature");
        require(!usedSignatures[messageHash], "Signature already used");
        usedSignatures[messageHash] = true;

        uint256 distributableFunds = treasuryPool;
        if (treasuryPool > MINIMUM_TREASURY * 2) {
            distributableFunds = treasuryPool - MINIMUM_TREASURY;
        }

        uint256 finderReward = (distributableFunds * 70) / 100;
        uint256 diggersReward = (distributableFunds * 10) / 100;
        
        treasuryPool -= finderReward;
        treasuryStats.totalOutflow += finderReward;
        (bool success, ) = payable(finder).call{value: finderReward}("");
        require(success, "Finder reward transfer failed");
        
        address[] memory diggers = treasureHuntDiggers[currentTreasureHuntId];
        if (diggers.length > 0) {
            uint256 rewardPerDigger = diggersReward / diggers.length;
            for (uint256 i = 0; i < diggers.length; i++) {
                if (diggers[i] != finder) {
                    treasuryPool -= rewardPerDigger;
                    treasuryStats.totalOutflow += rewardPerDigger;
                    (bool s, ) = payable(diggers[i]).call{value: rewardPerDigger}("");
                    if (s) {
                        emit RewardDistributed(diggers[i], rewardPerDigger);
                    }
                }
            }
        }

        tokenBurned[shovelId] = true;
        currentTreasureHuntId = keccak256(abi.encodePacked(block.timestamp));
        treasuryStats.lastDistributionTime = block.timestamp;
        treasuryStats.distributionsCount++;
        
        emit TreasureFound(finder, finderReward);
    }

    function recordDig(
        address digger, 
        uint256 shovelId
    ) external onlyTEE whenNotPaused {
        require(_exists(shovelId), "Shovel doesn't exist");
        require(ownerOf(shovelId) == digger, "Not shovel owner");
        require(!tokenBurned[shovelId], "Shovel already burned");

        digHistory[digger].push(DigRecord({
            timestamp: block.timestamp,
            treasureHuntId: currentTreasureHuntId
        }));
        
        treasureHuntDiggers[currentTreasureHuntId].push(digger);
        tokenBurned[shovelId] = true;
        
        emit DigAttempted(digger, currentTreasureHuntId);
    }

    // View Functions
    function getAuctionInfo() external view returns (
        uint256 timeLeft,
        uint256 currentBid,
        address currentLeader,
        bool isActive,
        uint256 minNextBid
    ) {
        timeLeft = block.timestamp < currentAuction.endTime ? 
            currentAuction.endTime - block.timestamp : 0;
        currentBid = currentAuction.highestBid;
        currentLeader = currentAuction.highestBidder;
        isActive = currentAuction.active;
        minNextBid = currentBid + currentAuction.minBidIncrement;
    }

    function getDiggerCount(bytes32 treasureHuntId) external view returns (uint256) {
        return treasureHuntDiggers[treasureHuntId].length;
    }

    // Admin Functions
    function setTeeAgent(address _teeAgentAddress) external onlyOwner {
        teeAgentAddress = _teeAgentAddress;
    }

    function setFoundersAddress(address _foundersAddress) external onlyOwner {
        foundersAddress = _foundersAddress;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Emergency Functions
    function emergencyWithdraw() external onlyOwner {
        require(paused(), "Contract must be paused");
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Receive Function
    receive() external payable {}
}
