import { ethers } from "hardhat";

async function main() {
  const BToken = await ethers.getContractFactory("BToken");
  const btoken = await BToken.deploy(1000000);
  await btoken.deployed();
  console.log("BToken deployed to:", btoken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
