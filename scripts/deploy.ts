import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TreasureHunt contract
  const TreasureHunt = await ethers.getContractFactory("TreasureHunt");
  const treasureHunt = await TreasureHunt.deploy(
    deployer.address, // founders address
    deployer.address  // TEE agent address (using deployer for testing)
  );

  await treasureHunt.waitForDeployment();
  const treasureHuntAddress = await treasureHunt.getAddress();

  console.log("TreasureHunt deployed to:", treasureHuntAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });