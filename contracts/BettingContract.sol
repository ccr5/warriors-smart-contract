// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {BettingToken} from "contracts/BettingToken.sol";
import {IBetting} from "interfaces/IBetting.sol";
import {IBettingMetadata, Team} from "interfaces/IBettingMetadata.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Betting is IBetting, IBettingMetadata {
    BettingToken private _token;
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
        uint256 balance = _token.allowance(msg.sender, address(this));
        require(balance > 0, "this must to be an approved");
        require(balance >= amount_, "allowance must to be >= amount");
        _;
    }

    constructor(BettingToken token_) {
        addTeam("Sao Paulo");
        addTeam("Corinthians");
        addTeam("Santos");
        addTeam("Palmeiras");
        _organizer = msg.sender;
        _token = token_;
    }

    /**
     * See IBetting Interface (bet function)
     */
    function bet(uint256 teamId_, uint256 amount_)
        external
        override
        onlyValidTeam(teamId_)
        isApproved(amount_)
        returns (bool success)
    {
        _token.transferFrom(msg.sender, address(this), amount_);
        _teams[teamId_].bets++;
        _teams[teamId_].tokens += amount_;
        _bets[teamId_].push(msg.sender);
        _totalBetted += amount_;
        emit Betted(teamId_);
        return true;
    }

    /**
     * See IBetting Interface (end function)
     */
    function end(uint256 winner_)
        external
        override
        onlyOrganizer
        returns (bool success)
    {
        require(block.number >= _endBlock, "Time not over yet");

        uint256 fracAmount = _teams[winner_].tokens / _teams[winner_].bets;

        for (uint256 teamId = 0; teamId < _bets[winner_].length; teamId++) {
            _token.transfer(_bets[winner_][teamId], fracAmount);
        }

        return true;
    }

    /**
     * See IBettingMetadata Interface (teamsCount function)
     */
    function teamsCount() external view override returns (uint256) {
        return _teamsCount;
    }

    /**
     * See IBettingMetadata Interface (totalBetted function)
     */
    function totalBetted() external view override returns (uint256) {
        return _totalBetted;
    }

    /**
     * See IBettingMetadata Interface (endBlock function)
     */
    function endBlock() external view override returns (uint256) {
        return _endBlock;
    }

    /**
     * See IBettingMetadata Interface (teams function)
     */
    function teams(uint256 teamId_)
        external
        view
        override
        returns (Team memory)
    {
        return _teams[teamId_];
    }

    function bets(uint256 teamId_)
        external
        view
        override
        returns (address[] memory)
    {
        return _bets[teamId_];
    }

    function addTeam(string memory name_) private {
        _teamsCount++;
        _teams[_teamsCount] = Team(_teamsCount, name_, 0, 0);
    }
}
