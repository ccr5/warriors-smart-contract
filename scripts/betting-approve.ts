import { ethers } from "hardhat";

async function main() {
  // insert here the Betting Token Address
  const betAddress = "0x07F0CbE8eBe58eFfA359bF3f54cAF0FFC81e5C9E";
  // insert here the Betting Address
  const bettingAddress = "0xF87b0d13a6EfB058A91808b7217f9b86E4308165";
  const signer = ethers.provider.getSigner();

  const BettingToken = await ethers.getContractAt(
    "BettingToken",
    betAddress,
    signer
  );

  const bet = await BettingToken._deployed();
  await bet.approve(bettingAddress, 1000000);
  console.log("Approve Ok");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
