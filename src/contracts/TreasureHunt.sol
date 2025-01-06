// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TreasureHunt is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    struct Auction {
        uint256 startTime;
        uint256 highestBid;
        address highestBidder;
        bool ended;
    }
    
    struct TreasureGame {
        uint256 prizePool;
        bool active;
        uint256 winningCell;
        uint256 islandNumber;
    }
    
    Counters.Counter private _tokenIds;
    Auction public currentAuction;
    TreasureGame public currentGame;
    
    uint256 public constant AUCTION_DURATION = 1 days;
    uint256 public constant GRID_SIZE = 36;
    uint256 public constant ISLANDS_COUNT = 3;
    
    address public foundersWallet;
    uint256 public constant FOUNDERS_SHARE = 10; // 10%
    uint256 public constant WINNER_SHARE = 70; // 70%
    uint256 public constant NEXT_GAME_SHARE = 30; // 30%
    
    mapping(uint256 => bool) public usedShovels;
    
    event AuctionStarted(uint256 startTime);
    event NewBid(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);
    event TreasureFound(address winner, uint256 amount);
    event NewGameStarted(uint256 prizePool);
    
    constructor(address _foundersWallet) ERC721("TreasureHuntShovel", "SHOVEL") Ownable(msg.sender) {
        foundersWallet = _foundersWallet;
        _startNewGame(0);
        _startNewAuction();
    }
    
    function _startNewAuction() internal {
        require(currentAuction.ended || currentAuction.startTime == 0, "Current auction not ended");
        
        currentAuction = Auction({
            startTime: block.timestamp,
            highestBid: 0,
            highestBidder: address(0),
            ended: false
        });
        
        emit AuctionStarted(block.timestamp);
    }
    
    function bid() external payable {
        require(block.timestamp < currentAuction.startTime + AUCTION_DURATION, "Auction ended");
        require(msg.value > currentAuction.highestBid, "Bid too low");
        
        address previousBidder = currentAuction.highestBidder;
        uint256 previousBid = currentAuction.highestBid;
        
        currentAuction.highestBidder = msg.sender;
        currentAuction.highestBid = msg.value;
        
        if (previousBidder != address(0)) {
            (bool success, ) = previousBidder.call{value: previousBid}("");
            require(success, "Failed to refund previous bidder");
        }
        
        emit NewBid(msg.sender, msg.value);
    }
    
    function endAuction() external {
        require(block.timestamp >= currentAuction.startTime + AUCTION_DURATION, "Auction not yet ended");
        require(!currentAuction.ended, "Auction already ended");
        
        currentAuction.ended = true;
        
        if (currentAuction.highestBidder != address(0)) {
            _tokenIds.increment();
            uint256 newTokenId = _tokenIds.current();
            _safeMint(currentAuction.highestBidder, newTokenId);
            
            // Distribute funds
            uint256 foundersAmount = (currentAuction.highestBid * FOUNDERS_SHARE) / 100;
            uint256 prizeAmount = currentAuction.highestBid - foundersAmount;
            
            currentGame.prizePool += prizeAmount;
            
            (bool success, ) = foundersWallet.call{value: foundersAmount}("");
            require(success, "Failed to send founders share");
        }
        
        emit AuctionEnded(currentAuction.highestBidder, currentAuction.highestBid);
        _startNewAuction();
    }
    
    function digForTreasure(uint256 tokenId, uint256 islandNumber, uint256 cellNumber) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(!usedShovels[tokenId], "Shovel already used");
        require(islandNumber < ISLANDS_COUNT, "Invalid island number");
        require(cellNumber < GRID_SIZE, "Invalid cell number");
        require(currentGame.active, "No active game");
        
        usedShovels[tokenId] = true;
        
        if (islandNumber == currentGame.islandNumber && cellNumber == currentGame.winningCell) {
            // Winner found!
            uint256 winnerPrize = (currentGame.prizePool * WINNER_SHARE) / 100;
            uint256 nextGamePrize = (currentGame.prizePool * NEXT_GAME_SHARE) / 100;
            
            (bool success, ) = msg.sender.call{value: winnerPrize}("");
            require(success, "Failed to send prize to winner");
            
            emit TreasureFound(msg.sender, winnerPrize);
            _startNewGame(nextGamePrize);
        }
    }
    
    function _startNewGame(uint256 initialPrize) internal {
        currentGame = TreasureGame({
            prizePool: initialPrize,
            active: false, // Game starts inactive until treasure position is set
            winningCell: 0,
            islandNumber: 0
        });
        
        emit NewGameStarted(initialPrize);
    }

    function setTreasureLocation(uint256 islandNumber, uint256 cellNumber) external onlyOwner {
        require(!currentGame.active, "Game already active");
        require(islandNumber < ISLANDS_COUNT, "Invalid island number");
        require(cellNumber < GRID_SIZE, "Invalid cell number");
        
        currentGame.islandNumber = islandNumber;
        currentGame.winningCell = cellNumber;
        currentGame.active = true;
    }
    
    function getAuctionStatus() external view returns (
        uint256 startTime,
        uint256 highestBid,
        address highestBidder,
        bool ended
    ) {
        return (
            currentAuction.startTime,
            currentAuction.highestBid,
            currentAuction.highestBidder,
            currentAuction.ended
        );
    }
    
    function getCurrentPrizePool() external view returns (uint256) {
        return currentGame.prizePool;
    }
}
