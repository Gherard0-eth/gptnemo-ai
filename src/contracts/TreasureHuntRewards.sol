// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./TreasureHuntBase.sol";

contract TreasureHuntRewards is ReentrancyGuard, Ownable {
    using ECDSA for bytes32;

    TreasureHuntBase public baseContract;

    constructor(address _baseContract) {
        baseContract = TreasureHuntBase(_baseContract);
    }

    function verifyAndDistributeReward(
        address finder,
        uint256 shovelId,
        bytes memory signature
    ) external onlyTEE nonReentrant {
        require(baseContract.ownerOf(shovelId) == finder, "Not shovel owner");
        require(!baseContract.tokenBurned(shovelId), "Shovel already burned");
        
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                baseContract.currentTreasureHuntId(),
                finder,
                shovelId,
                block.chainid
            )
        );
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address recoveredSigner = ethSignedMessageHash.recover(signature);
        require(recoveredSigner == baseContract.teeAgentAddress(), "Invalid signature");
        require(!baseContract.usedSignatures(messageHash), "Signature already used");
        baseContract.setUsedSignature(messageHash);

        uint256 distributableFunds = baseContract.treasuryPool();
        if (baseContract.treasuryPool() > baseContract.MINIMUM_TREASURY() * 2) {
            distributableFunds = baseContract.treasuryPool() - baseContract.MINIMUM_TREASURY();
        }

        uint256 finderReward = (distributableFunds * 70) / 100;
        uint256 diggersReward = (distributableFunds * 10) / 100;
        
        baseContract.decreaseTreasuryPool(finderReward);
        (bool success, ) = payable(finder).call{value: finderReward}("");
        require(success, "Finder reward transfer failed");
        
        address[] memory diggers = baseContract.treasureHuntDiggers(baseContract.currentTreasureHuntId());
        if (diggers.length > 0) {
            uint256 rewardPerDigger = diggersReward / diggers.length;
            for (uint256 i = 0; i < diggers.length; i++) {
                if (diggers[i] != finder) {
                    baseContract.decreaseTreasuryPool(rewardPerDigger);
                    (bool s, ) = payable(diggers[i]).call{value: rewardPerDigger}("");
                    if (s) {
                        emit RewardDistributed(diggers[i], rewardPerDigger);
                    }
                }
            }
        }

        baseContract.setTokenBurned(shovelId);
        baseContract.setCurrentTreasureHuntId(keccak256(abi.encodePacked(block.timestamp)));
        baseContract.incrementDistributionsCount();
        
        emit TreasureFound(finder, finderReward);
    }

    event RewardDistributed(address indexed digger, uint256 amount);
    event TreasureFound(address indexed finder, uint256 reward);
}
