// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {IBrasileirao} from "interfaces/IBrasileirao.sol";

contract Brasileirao is IBrasileirao {
    uint256 public _teamsCount;

    mapping(uint256 => Team) public teams;

    struct Team {
        uint256 id;
        string name;
        uint256 bets;
    }

    constructor() {
        addTeam("Sao Paulo");
        addTeam("Corinthians");
        addTeam("Santos");
        addTeam("Palmeiras");
    }

    function bet(uint256 _teamId) external override returns (bool success) {
        require(
            _teamId > 0 && _teamId <= _teamsCount,
            "teamId MUST to be valid"
        );
        teams[_teamId].bets++;
        emit Betted(_teamId);
        return true;
    }

    function addTeam(string memory _name) private {
        _teamsCount++;
        teams[_teamsCount] = Team(_teamsCount, _name, 0);
    }
}
