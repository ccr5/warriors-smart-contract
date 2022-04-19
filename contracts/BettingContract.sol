// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {IBetting} from "interfaces/IBetting.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Betting is IBetting {
    IERC20 private _token;
    address private _organizer;
    uint256 private _teamsCount;
    uint256 private _totalBetted;
    uint256 private _endBlock;

    mapping(uint256 => Team) private _teams;
    mapping(uint256 => address[]) private _bets;

    modifier onlyOrganizer() {
        require(msg.sender == _organizer, "Only Organizer can call it");
        _;
    }

    modifier onlyValidTeam(uint256 teamId_) {
        require(
            teamId_ > 0 && teamId_ <= _teamsCount,
            "teamId MUST to be valid"
        );
        _;
    }

    modifier isApproved(uint256 amount_) {
        uint256 balance = IERC20(_token).allowance(msg.sender, address(this));
        require(balance > 0, "this must to be an approved");
        require(balance >= amount_, "allowance must to be >= amount");
        _;
    }

    struct Team {
        uint256 id;
        string name;
        uint256 bets;
        uint256 tokens;
    }

    constructor(IERC20 token_) {
        addTeam("Sao Paulo");
        addTeam("Corinthians");
        addTeam("Santos");
        addTeam("Palmeiras");
        _organizer = msg.sender;
        _token = token_;
    }

    function bet(uint256 teamId_, uint256 amount_)
        external
        override
        onlyValidTeam(teamId_)
        isApproved(amount_)
        returns (bool success)
    {
        IERC20(_token).transferFrom(msg.sender, address(this), amount_);
        _teams[teamId_].bets++;
        _teams[teamId_].tokens += amount_;
        _bets[teamId_].push(msg.sender);
        _totalBetted += amount_;
        emit Betted(teamId_);
        return true;
    }

    function end(uint256 winner_)
        external
        onlyOrganizer
        returns (bool success)
    {
        require(block.number >= _endBlock, "Time not over yet");

        uint256 fracAmount = _teams[winner_].tokens / _teams[winner_].bets;

        for (uint256 teamId = 0; teamId < _bets[winner_].length; teamId++) {
            IERC20(_token).transfer(_bets[winner_][teamId], fracAmount);
        }

        return true;
    }

    function addTeam(string memory name_) private {
        _teamsCount++;
        _teams[_teamsCount] = Team(_teamsCount, name_, 0, 0);
    }
}
