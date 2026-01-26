const ethers = require("ethers");
const fs = require("fs");

const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Account #0
const RPC_URL = "http://127.0.0.1:8545";

// Load contract artifact
const artifact = require("./artifacts/contracts/PredictionGame.sol/PredictionGame.json");

async function deploy() {
  console.log("Connecting to Hardhat node at", RPC_URL);
  
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  console.log("Deploying from account:", wallet.address);
  
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  console.log("Deploying contract...");
  
  const contract = await factory.deploy();
  console.log("Contract deployment transaction:", contract.deployTransaction.hash);
  
  // Wait for deployment
  const receipt = await contract.deployTransaction.wait();
  console.log("✓ Contract deployed to:", receipt.contractAddress);
  
  fs.writeFileSync("deployed_address.txt", receipt.contractAddress);
  console.log("Address saved to deployed_address.txt");
}

deploy().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
