import { ethers } from "hardhat";

async function main() {
  const Brasileirao = await ethers.getContractFactory("Brasileirao");
  const brasileirao = await Brasileirao.deploy();

  brasileirao.deployed().then((contract) => {
    console.log("Brasileirao deployed to:", contract.address);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
