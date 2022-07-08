import { ethers } from "hardhat";

async function main() {
  const BettingToken = await ethers.getContractFactory("BettingToken");
  const bet = await BettingToken.deploy(1000000);
  console.log("BettingToken deployed to:", bet.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
