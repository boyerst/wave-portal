// We use scripts to help us imitate the blockchain in our local environment
  // This will compile and deploy to local blockchain and will be destroyed by hardhat when the script ends
  // and will make it easy to iterate on the contract





const main = async () => {
  // REFACTOR: Commented 
  // Added this after adding wave() and getTotalWaves()
  // We need a wallet address in order to deploy to the blockchain
  // Harhat does this automatically but the following grabs the contract owner address and a random address
    // randomPerson simulates an external address calling your functions
  // const [owner, randomPerson] = await hre.ethers.getSigners();


  // Compiles our contract and generates files we need to work with our contract
    // Stores them in /artifacts
    // HRE = Hardhat Runtime Environment
    // waveContractFactory.deploy() = deploys local blockchain
      // Our functions become available to be called on the blockchain when deployed because they are public functions
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  // Hardhat creates a local ethereum environment for the contact
    // After the script is run the created, local environment is destroyed
    // So everytime you run the contract it provides a fresh blockchain for our local development needs (similar to refreshing server)
  const waveContract = await waveContractFactory.deploy({
    // REFACTOR: This line commands that when the contract is deployed, fund it with .01 ETH
      // It takes the ETH from your wallet
    value: hre.ethers.utils.parseEther("0.1"),
  });
  // The code waits to execute further until our contract if deployed
    // Our constructor is run when it is actually deployed
  await waveContract.deployed();
  // REFACTOR: Commented
  // Contract deploys to waveContract.address which will give us the address of the deployed contract
  // console.log("Contract deployed to:", waveContract.address);
  // console.log("Contract deployed by:", owner.address);

  console.log('Contract addy:', waveContract.address);

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract Balance:",
    // Test if your contract has a balance of .01
    hre.ethers.utils.formatEther(contractBalance)
  );


  // We added these because we need to manually call our functions (similar to an API)
  // Call getTotalWaves() to get total waves
  // let waveCount;
  // waveCount = await waveContract.getTotalWaves();
  // console.log(waveCount.toNumber());


  // Call the wave() contract
    // Adds wave to totalWaves state var
    // REFACTOR: added 'A Message!'
  // let waveTxn = await waveContract.wave('A message!');
  // // Wait for Tx to be mined
  // await waveTxn.wait();

  // REFACTOR: Added two waves
    // Need to make sure the contract balance went down by 0.0001 only in the case that a random # less than 50 is generated!
  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();



  // Use function given to us by ethers - getBalance() - to pass the balance to your contracts address
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract Balance:",
    // Print out balance again to see if ETH was removed when someone waves at you
    hre.ethers.utils.formatEther(contractBalance)
  );


  // const [_, randomPerson] = await hre.ethers.getSigners();
  // waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
  // // Wait for Tx to be mined
  // await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);


  // REFACTOR: commented
  // Call the waveCount one more time to see changes...
    // Reads the new value
  // waveCount = await waveContract.getTotalWaves();

  // Simulates other people calling our functions
  // waveTxn = await waveContract.connect(randomPerson).wave();
  // await waveTxn.wait();
  // Call the waveCount another time to see if random person called the function
    // Reads new value
  // waveCount = await waveContract.getTotalWaves();

};



const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();