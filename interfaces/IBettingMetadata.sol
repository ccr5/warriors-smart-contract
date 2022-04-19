// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Team {
    uint256 id;
    string name;
    uint256 bets;
    uint256 tokens;
}

interface IBettingMetadata {
    function teamsCount() external view returns (uint256);

    function totalBetted() external view returns (uint256);

    function endBlock() external view returns (uint256);

    function teams(uint256 teamId_) external view returns (Team memory);
}
