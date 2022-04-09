import { ethers } from "hardhat";

async function main() {
  const YToken = await ethers.getContractFactory("YToken");
  const ytoken = await YToken.deploy(1000000);
  await ytoken.deployed();
  console.log("YToken deployed to:", ytoken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
