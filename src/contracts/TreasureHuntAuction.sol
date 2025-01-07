// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TreasureHuntAuction is ReentrancyGuard, Ownable {
    uint256 public constant AUCTION_DURATION = 5 minutes;
    uint256 public constant AUCTION_EXTENSION = 60 seconds;

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

    Auction public currentAuction;

    event AuctionStarted(uint256 startTime, uint256 endTime, uint256 minBid);
    event BidPlaced(address indexed bidder, uint256 amount, uint256 newEndTime);
    event AuctionExtended(uint256 newEndTime);
    event ShovelMinted(address indexed winner, uint256 tokenId);

    constructor() {
        startNewAuction();
    }

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

    function placeBid() external payable onlyDuringAuction nonReentrant {
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

    function finalizeAuction() external nonReentrant {
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

    modifier onlyDuringAuction() {
        require(currentAuction.active, "No active auction");
        require(block.timestamp < currentAuction.endTime, "Auction ended");
        _;
    }
}
