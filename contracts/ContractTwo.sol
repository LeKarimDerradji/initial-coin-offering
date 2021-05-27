// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ContractTwo {

    uint private _theOne;

    constructor() {
        _theOne = 1; 
    }

    function theOne() public view returns(uint) {
        return _theOne;
    }
}
