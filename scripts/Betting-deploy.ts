import { ethers } from "hardhat";

async function main() {
  const BettingToken = await ethers.getContractFactory("BettingToken");
  const bet = await BettingToken.deploy(1000000);
  console.log("BettingToken deployed to:", bet.address);

  const endBlock = 100;
  const Betting = await ethers.getContractFactory("Betting");
  const betting = await Betting.deploy(bet.address, endBlock);
  await betting._deployed();
  console.log("Betting deployed to:", betting.address);

  await bet.approve(betting.address, 1000000);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
