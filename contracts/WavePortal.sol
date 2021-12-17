// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
// Allows us to console.log in our contract
import "hardhat/console.sol";


contract WavePortal {

  // State var initialized to 0 (permanent in contact storage)
  uint256 totalWaves;

  constructor() {
    console.log("Here's the contract!");

  }


  function wave() public {
    // Assignment operator (Add and Assignment) adds R operand to L and assigns result to L operand
    totalWaves += 1;
    console.log("%s has waived!", msg.sender);
  }

  // Public = can be called from anywhere (internal or message-calls)
    // View = read only
    // returns an unsigned integer
  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }



  
}

