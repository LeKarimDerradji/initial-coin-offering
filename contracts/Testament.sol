// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/Address.sol';

contract Testament {
    using Address for address payable;
    // storage
    address private _owner;
    address private _doctor;
    bool private _isOwnerDead;
    mapping (address => uint256) private _legacy;

    //event
    event Bequeath(address indexed account, uint256 amount);
    event DoctorChanged(address indexed doctor);
    event ContractEnded(address doctor);
    event LegacyWithdrew(address indexed account, uint256 amount);
    
    
    constructor (address owner_, address doctor_){
        require(owner_ != doctor_, 'Testament: You cannot define the owner and the doctor as the same person.');
        _owner = owner_;
        _doctor = doctor_;
    }
    
    
    // modifier
    modifier onlyOwner() {
        require (msg.sender == _owner, 'Testament:  only the owner is allow to call that function.');
        _;
    }
    
    modifier onlyDoctor() {
        require(msg.sender == _doctor, 'Testament: only the doctor is allow to call that function.');
        _;
    }
    
    modifier certifiedDeath() {
        require(_isOwnerDead == true,'Testament: The owner is not disclosed as dead yet.');
        _;
    }
    
    
    // functions
    function bequeath(address account) external payable onlyOwner {
        _legacy[account] += msg.value;
        emit Bequeath(account,msg.value);
    }
    
    function setDoctor(address account) public onlyOwner {
        require(msg.sender != account, 'Testament: You cannot be set as doctor.');
        _doctor = account;
        emit DoctorChanged(account);
    }
    
    function setCertifiedDeath() public onlyDoctor {
        require(_isOwnerDead == false,'Testament: The Owner is already dead!.');
        _isOwnerDead = true;
        emit ContractEnded(msg.sender);
    }
    
    function withdraw() public certifiedDeath {
        require(_legacy[msg.sender] != 0,'Testament: You do not have any legacy on this contract.');
        uint256 amount = _legacy[msg.sender];
        _legacy[msg.sender] = 0;
        payable(msg.sender).sendValue(amount);
        emit LegacyWithdrew(msg.sender,amount);
    }

    function legacyOf(address account) public view returns (uint256) {
        return _legacy[account];
    }
    
    function doctor() public view returns (address) {
        return _doctor;
    }
    
    function owner() public view returns (address) {
        return _owner;
    }
    
    function isDeathCertified() public view returns (bool) {
        return _isOwnerDead;
    }
    
}







