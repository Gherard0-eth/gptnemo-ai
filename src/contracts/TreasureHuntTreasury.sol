// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TreasureHuntTreasury is Ownable {
    uint256 public constant MINIMUM_TREASURY = 1 ether;
    
    struct TreasuryStats {
        uint256 totalInflow;
        uint256 totalOutflow;
        uint256 lastDistributionTime;
        uint256 distributionsCount;
    }

    uint256 public treasuryPool;
    address public foundersAddress;
    TreasuryStats public treasuryStats;

    event RewardDistributed(address indexed digger, uint256 amount);

    constructor(address _foundersAddress) {
        foundersAddress = _foundersAddress;
    }

    function setFoundersAddress(address _foundersAddress) external onlyOwner {
        foundersAddress = _foundersAddress;
    }

    function addToTreasury(uint256 amount) external onlyOwner {
        treasuryPool += amount;
        treasuryStats.totalInflow += amount;
    }

    function distributeReward(address digger, uint256 amount) external onlyOwner {
        require(treasuryPool >= amount, "Insufficient treasury pool");
        treasuryPool -= amount;
        treasuryStats.totalOutflow += amount;

        (bool success, ) = payable(digger).call{value: amount}("");
        require(success, "Reward transfer failed");

        emit RewardDistributed(digger, amount);
    }

    function getTreasuryStats() external view returns (TreasuryStats memory) {
        return treasuryStats;
    }

    function getTreasuryPool() external view returns (uint256) {
        return treasuryPool;
    }
}
