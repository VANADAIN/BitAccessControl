// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BitAccessControl.sol";

contract ACBit is BitAccessControl {

    // 0 shift is admin: 00000001
    uint8 public constant MINTER = uint8(1) << 1; // 00000010
    uint8 public constant DEPOSITOR = uint8(1) << 2; // 00000100
    uint8 public constant WITHDRAWER = uint8(1) << 3; // etc. 
    uint8 public constant ADMIN = uint8(1) << 4; 
    uint8 public constant CHEF = uint8(1) << 5; 
    uint8 public constant PROTOCOL = uint8(1) << 6; 
    uint8 public constant SPECIFIC = uint8(1) << 7; 

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
}
