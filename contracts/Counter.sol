// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Counter {

    string public name;
    uint public count;

    constructor(string memory _name , uint _initialCount){
        name = _name;
        count = _initialCount;
    }

    function increment() public returns (uint newCount){
        count ++;
        return count;
    }

    function decrement() public returns (uint newCount){
        count --;
        return count;
    }

    function getCount() public view returns (uint _count){
        return count;
    }

    function getName() public view returns (string memory _name){
        return name;
    }

    function setName(string memory _setName) public returns(string memory newName){
        name = _setName;
        return name;
    }
}