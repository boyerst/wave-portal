// We use scripts to help us imitate the blockchain in our local environment
  // This will compile and deploy to local blockchain and will be destroyed by hardhat when the script ends
  // and will make it easy to iterate on the contract





const main = async () => {
  
  // Compiles our contract and generates files we need to work with our contract
    // Stores them in /artifacts
    // HRE = Hardhat Runtime Environment
    // waveContractFactory.deploy() = deploys local blockchain
      // Our functions become available to be called on the blockchain when deployed because they are public functions
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  // Hardhat creates a local ethereum environment for the contact
    // After the script is run the created, local environment is destroyed
    // So everytime you run the contract it provides a fresh blockchain for our local development needs (similar to refreshing server)
  const waveContract = await waveContractFactory.deploy();
  // The code waits to execute further until our contract if deployed
    // Our constructor is run when it is actually deployed
  await waveContract.deployed();
  // Contract deploys to waveContract.address which will give us the address of the deployed contract
  console.log("Contract deployed to:", waveContract.address);

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