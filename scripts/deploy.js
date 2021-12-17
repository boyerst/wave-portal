// In run.js, the local environment that the script creates is destroyed by Hardhat when the script ends
  // In this script, a local environment will be created and will stay alive
  // It also gives us 20 accounts with 10000 ETH each
// Similar to our script in run.js



const main = async () => {
  // Grabs wallet address of the deployer of the contract
  const [deployer] = await hre.ethers.getSigners();
  // Grabs balance of account of the deployer of the contract
  const accountBalance = await deployer.getBalance();


  console.log('Deploying contracts with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  // Grabs our contract address
  const Token = await hre.ethers.getContractFactory('WavePortal');
  // Deploys our contract 
  const portal = await Token.deploy();
  // The code waits for the contract to be deployed
  await portal.deployed();

  console.log('WavePortal address: ', portal.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();