// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TreasureHunt is ERC721, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    // Counters
    Counters.Counter private _tokenIds;
    Counters.Counter private _auctionIds;
    
    // Constants
    uint256 public constant AUCTION_DURATION = 24 hours;
    uint256 public constant MIN_BID_INCREMENT = 0.01 ether;
    uint256 public constant FOUNDERS_FEE = 10; // 10%
    uint256 public constant NEXT_POOL_FEE = 30; // 30%
    
    // Structs
    struct Auction {
        uint256 id;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        bool ended;
    }
    
    struct TreasureLocation {
        uint256 islandId;
        uint256 x;
        uint256 y;
        bool found;
    }
    
    // State variables
    mapping(uint256 => Auction) public auctions;
    mapping(address => uint256) public pendingReturns;
    uint256 public currentPrizePool;
    uint256 public nextPrizePool;
    address public foundersWallet;
    TreasureLocation public currentTreasure;
    
    // Events
    event AuctionStarted(uint256 indexed auctionId, uint256 tokenId);
    event BidPlaced(uint256 indexed auctionId, address bidder, uint256 amount);
    event AuctionEnded(uint256 indexed auctionId, address winner, uint256 amount);
    event TreasureFound(address finder, uint256 amount);
    
    constructor(address _foundersWallet) ERC721("TreasureHuntShovel", "SHOVEL") Ownable(msg.sender) {
        foundersWallet = _foundersWallet;
    }
    
    // Auction Functions
    function startNewAuction() external onlyOwner {
        require(block.timestamp >= auctions[_auctionIds.current()].endTime, "Previous auction not ended");
        
        _tokenIds.increment();
        _auctionIds.increment();
        
        uint256 newAuctionId = _auctionIds.current();
        uint256 newTokenId = _tokenIds.current();
        
        Auction storage auction = auctions[newAuctionId];
        auction.id = newAuctionId;
        auction.tokenId = newTokenId;
        auction.startTime = block.timestamp;
        auction.endTime = block.timestamp + AUCTION_DURATION;
        
        emit AuctionStarted(newAuctionId, newTokenId);
    }
    
    function placeBid(uint256 auctionId) external payable nonReentrant {
        Auction storage auction = auctions[auctionId];
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.highestBid + MIN_BID_INCREMENT, "Bid too low");
        
        if (auction.highestBidder != address(0)) {
            pendingReturns[auction.highestBidder] += auction.highestBid;
        }
        
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        
        emit BidPlaced(auctionId, msg.sender, msg.value);
        
        // Extend auction if less than 1 minute left
        if (auction.endTime - block.timestamp < 1 minutes) {
            auction.endTime += 30 seconds;
        }
    }
    
    function endAuction(uint256 auctionId) external nonReentrant {
        Auction storage auction = auctions[auctionId];
        require(block.timestamp >= auction.endTime, "Auction not yet ended");
        require(!auction.ended, "Auction already ended");
        
        auction.ended = true;
        
        if (auction.highestBidder != address(0)) {
            // Mint NFT to winner
            _safeMint(auction.highestBidder, auction.tokenId);
            
            // Distribute funds
            uint256 foundersFee = (auction.highestBid * FOUNDERS_FEE) / 100;
            uint256 nextPoolAmount = (auction.highestBid * NEXT_POOL_FEE) / 100;
            uint256 currentPoolAmount = auction.highestBid - foundersFee - nextPoolAmount;
            
            currentPrizePool += currentPoolAmount;
            nextPrizePool += nextPoolAmount;
            
            // Transfer founders fee
            (bool sent, ) = foundersWallet.call{value: foundersFee}("");
            require(sent, "Failed to send founders fee");
        }
        
        emit AuctionEnded(auctionId, auction.highestBidder, auction.highestBid);
    }
    
    // Treasure Functions
    function setTreasureLocation(uint256 islandId, uint256 x, uint256 y) external onlyOwner {
        currentTreasure = TreasureLocation(islandId, x, y, false);
    }
    
    function claimTreasure(uint256 islandId, uint256 x, uint256 y) external nonReentrant {
        require(balanceOf(msg.sender) > 0, "Must own a shovel");
        require(!currentTreasure.found, "Treasure already found");
        require(
            islandId == currentTreasure.islandId &&
            x == currentTreasure.x &&
            y == currentTreasure.y,
            "Wrong location"
        );
        
        currentTreasure.found = true;
        uint256 reward = currentPrizePool;
        currentPrizePool = nextPrizePool;
        nextPrizePool = 0;
        
        // Transfer reward to finder
        (bool sent, ) = msg.sender.call{value: reward}("");
        require(sent, "Failed to send reward");
        
        emit TreasureFound(msg.sender, reward);
    }
    
    // Utility Functions
    function withdrawBid() external nonReentrant {
        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        pendingReturns[msg.sender] = 0;
        
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send refund");
    }
    
    function getCurrentAuction() external view returns (
        uint256 id,
        uint256 tokenId,
        uint256 startTime,
        uint256 endTime,
        address highestBidder,
        uint256 highestBid,
        bool ended
    ) {
        Auction storage auction = auctions[_auctionIds.current()];
        return (
            auction.id,
            auction.tokenId,
            auction.startTime,
            auction.endTime,
            auction.highestBidder,
            auction.highestBid,
            auction.ended
        );
    }
    
    receive() external payable {}
}