import { ethers } from "hardhat";

async function main() {
  const endBlock = 2022;
  const betAddress = "0x07F0CbE8eBe58eFfA359bF3f54cAF0FFC81e5C9E"; // insert here the Betting Token Address
  const Betting = await ethers.getContractFactory("Betting");
  const betting = await Betting.deploy(betAddress, endBlock);
  await betting._deployed();
  console.log("Betting deployed to:", betting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
