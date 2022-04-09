// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBrasileirao {
    /// @param _teamId Id of a valid team
    event Betted(uint256 indexed _teamId);

    /// @notice Bet in a team
    /// @dev _teamId must to be a valid team. Emits Betted event
    /// @param _teamId Id of a valid team
    /// @return success boolean
    function bet(uint256 _teamId) external returns (bool success);
}
