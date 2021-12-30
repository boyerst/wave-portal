// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
// Allows us to console.log in our contract
import "hardhat/console.sol";


contract WavePortal {

  // State var initialized to 0 (permanent in contact storage)
  uint256 totalWaves;

  // Seed used to generate random number to deteremine prize winning wavers
  uint256 private seed;

  // Wave event, emits in wave function
  event NewWave(address indexed from, uint256 timestamp, string message);



  // We create a wave struct to denote the properties of the wave
  struct Wave {
      address waver; // The address of the user who waved.
      string message; // The message the user sent.
      uint256 timestamp; // The timestamp when the user waved.
  }


   // Here we declare a variable waves that allows us to store an array of structs
    // This will hold all of our waves
  Wave[] waves;


  // Made it payable so that we can send ETH to people
  constructor() payable {
    console.log("Here's the contract!");
  }



  // REFACTOR: Now requires a string called _message that the users will write to us from the from end
  function wave(string memory _message) public {
    // Assignment operator (Add and Assignment) adds R operand to L and assigns result to L operand
    totalWaves += 1;
    console.log("%s has waived!", msg.sender, _message);
    // Now we push the users' 'wave' data to the waves array
      // incl. who, message, what time
    waves.push(Wave(msg.sender, _message, block.timestamp));

    // Added generation of random number to use to generate a prize for waving
      // Whereas before anyone who waved would receive ETH <- we would run out of money!
    // Generate a new seed for the next user that sends a wave
      // We take two numbers given by solidity (difficulty and timestamp) and combine them to create a random number
      // These two are random but both are controllable by random attackers, thus we add a var seed that changes with every wave
      // Then we do modulus 100 to ensure number is brought to a range between 0 - 100
    seed = (block.difficulty + block.timestamp + seed) % 100;
    console.log("Random # generated: %d", seed);

    // Give a 50% chance that the user wins the prize
    if (seed <= 50) {
      console.log("%s won!", msg.sender);

      // Give winner .0001 ETH when they wave at you
      uint256 prizeAmount = 0.0001 ether;
      require(
        // Initiates a prizeAmount using the keyword ether to represent monetary amounts
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has"
      );
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      // require success, if not kill the tx and send this message...
      require(success, "Failed to withdraw money from contract.");
    }

    // Now we emit the wave as an event
    emit NewWave(msg.sender, block.timestamp, _message);

  }

  // This function will return our struct array to us 
    // Allows us to grab the waves from the front end
  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
  }

  // Public = can be called from anywhere (internal or message-calls)
    // View = read only
    // returns an unsigned integer
  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }



  
}

