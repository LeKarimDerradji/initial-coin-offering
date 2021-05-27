// SPX-Lisence-Identifier: MIT

pragma solidity ^0.8.0;

contract myToken {
	mapping(address => uint256) private _balances; 
	mapping(address => uint256) private _allowance;

	string private _name; 
	string private _symbol;

	uint256 private _totalSupply; 
	
	constructor(string name_, string symbol) {
 		_name = name_;
		_symbol = symbol_;	
	}	
}








