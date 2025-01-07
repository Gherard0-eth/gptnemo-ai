// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./TreasureHuntAuction.sol";
import "./TreasureHuntTreasury.sol";

contract TreasureHuntBase is ERC721, ReentrancyGuard, Ownable, Pausable {
    TreasureHuntAuction public auction;
    TreasureHuntTreasury public treasury;
    
    address public teeAgentAddress;
    address public foundersAddress;
    bytes32 public currentTreasureHuntId;
    
    mapping(address => uint256) public messageCredits;
    mapping(address => DigRecord[]) public digHistory;
    mapping(bytes32 => address[]) public treasureHuntDiggers;
    mapping(uint256 => bool) public tokenBurned;
    mapping(bytes32 => bool) public usedSignatures;

    struct DigRecord {
        uint256 timestamp;
        bytes32 treasureHuntId;
    }

    event MessageSent(address indexed sender, uint256 cost);
    event BundlePurchased(address indexed buyer, uint256 amount);
    event TreasureFound(address indexed finder, uint256 reward);
    event DigAttempted(address indexed digger, bytes32 indexed huntId);

    modifier onlyTEE() {
        require(msg.sender == teeAgentAddress, "Only TEE Agent");
        _;
    }

    constructor(
        address _foundersAddress,
        address _teeAgentAddress
    ) ERC721("TreasureHuntShovel", "SHOVEL") {
        foundersAddress = _foundersAddress;
        teeAgentAddress = _teeAgentAddress;
        currentTreasureHuntId = keccak256(abi.encodePacked(block.timestamp));
        
        auction = new TreasureHuntAuction();
        treasury = new TreasureHuntTreasury(_foundersAddress);
    }

    // Message and Bundle Management
    function sendMessage() external payable whenNotPaused {
        if (messageCredits[msg.sender] > 0) {
            messageCredits[msg.sender]--;
        } else {
            require(msg.value == 0.003 ether, "Incorrect message payment");
            treasury.addInflow(msg.value);
        }
        emit MessageSent(msg.sender, msg.value);
    }

    function buyMessageBundle() external payable whenNotPaused {
        require(msg.value == 0.015 ether, "Incorrect bundle payment");
        messageCredits[msg.sender] += 5;
        treasury.addInflow(msg.value);
        emit BundlePurchased(msg.sender, 5);
    }

    function setTeeAgent(address _teeAgentAddress) external onlyOwner {
        teeAgentAddress = _teeAgentAddress;
    }

    function setFoundersAddress(address _foundersAddress) external onlyOwner {
        foundersAddress = _foundersAddress;
        treasury.setFoundersAddress(_foundersAddress);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {}
}
