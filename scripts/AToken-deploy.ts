import { ethers } from "hardhat";

async function main() {
  const AToken = await ethers.getContractFactory("AToken");
  const atoken = await AToken.deploy(1000000);
  await atoken.deployed();
  console.log("AToken deployed to:", atoken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
