// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ACOriginal is AccessControl {

    bytes32 public constant MINTER = keccak256("MINTER");
    bytes32 public constant DEPOSITOR = keccak256("DEPOSITOR");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }
}
