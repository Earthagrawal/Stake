const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const PredictionGame = await hre.ethers.getContractFactory("PredictionGame");
  const game = await PredictionGame.deploy();
  await game.deployed();

  const address = game.address;
  console.log("PredictionGame deployed to:", address);

  // Save to file for easy access
  fs.writeFileSync("deployed_address.txt", address);
  console.log("Address saved to deployed_address.txt");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
