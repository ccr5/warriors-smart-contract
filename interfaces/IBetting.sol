// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBetting {
    /// @param teamId_ Id of a valid team
    event Betted(uint256 indexed teamId_);

    /// @param winner_ Id of a valid team
    event Ended(uint256 indexed winner_);

    /// @notice Bet in a team
    /// @dev teamId_ must to be a valid team. Emits Betted event
    /// @param teamId_ Id of a valid team
    /// @param amount_ amount of tokens to bet
    /// @return success boolean
    function bet(uint256 teamId_, uint256 amount_)
        external
        returns (bool success);

    /// @notice Get the winner and distribute all tokens
    /// @dev only organizer can call this function. Emits Ended event
    /// @return success boolean
    function end(uint256 winner_) external returns (bool success);
}
