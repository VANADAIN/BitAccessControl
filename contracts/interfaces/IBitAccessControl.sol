// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (access/IAccessControl.sol)

pragma solidity ^0.8.20;

/**
 * @dev External interface of AccessControl.
 */
interface IBitAccessControl {
    error AccessControlUnauthorizedAccount(address account, uint8 position);

    event RoleAdminChanged(uint8 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    event RoleGranted(uint8 indexed role, address indexed account, address indexed sender);

    event RoleRevoked(uint8 indexed role, address indexed account, address indexed sender);
 
    function hasRole(uint8 position, address account) external view returns (bool);

    function grantRole(uint8 position, address account) external;

    function revokeRole(uint8 position, address account) external;

    function renounceRole(uint8 position) external;
}
