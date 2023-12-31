// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IBitAccessControl.sol";

abstract contract BitAccessControl is IBitAccessControl {
    mapping(address => uint8) private roleInfo;

    uint8 public constant DEFAULT_ADMIN_ROLE = 1;

    modifier onlyRole(uint8 mask) {
        _checkRole(mask, msg.sender);
        _;
    }

    function hasRole(uint8 mask, address account) public view virtual returns (bool res) {
        uint8 role = roleInfo[account];
        assembly {
            res := and(role, mask)
        }
    }

    function _checkRole(uint8 mask, address account) internal view virtual {
        if (!hasRole(mask, account)) {
            revert AccessControlUnauthorizedAccount(account, mask);
        }
    }

    function grantRole(uint8 mask, address account) public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(mask, account);
    }

    function revokeRole(uint8 mask, address account) public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(mask, account);
    }

    function renounceRole(uint8 mask) public virtual {
        _revokeRole(mask, msg.sender);
    }

    function _grantRole(uint8 mask, address account) internal virtual {
        if (!hasRole(mask, account)) {
            roleInfo[account] |=  mask;

            emit RoleGranted(mask, account, msg.sender);
        } 
    }

    function _revokeRole(uint8 mask, address account) internal virtual {
        if (hasRole(mask, account)) {
            roleInfo[account] &= ~(mask);
            
            emit RoleRevoked(mask, account, msg.sender);
        }
    }

    function readRolesAsBits(address acc) external view returns (uint8[8] memory bits) {
        for (uint8 i = 0; i < 8; i++) {
           bits[i] = (roleInfo[acc] >> i) & uint8(1);
        }
    }

    // function readRoles(address acc) external view returns (bool[8] memory bits) {
    //     for (uint8 i = 0; i < 8; i++) {
    //         bits[i] = ((roleInfo[acc] >> i) & uint8(1)) != 0;
    //     }
    // }
}
