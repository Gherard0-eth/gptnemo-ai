// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./TreasureHuntBase.sol";
import "./TreasureHuntAuction.sol";
import "./TreasureHuntTreasury.sol";
import "./TreasureHuntRewards.sol";

contract TreasureHunt is TreasureHuntBase {
    TreasureHuntRewards public rewards;

    constructor(
        address _foundersAddress,
        address _teeAgentAddress
    ) TreasureHuntBase(_foundersAddress, _teeAgentAddress) {
        rewards = new TreasureHuntRewards(address(this));
    }
}