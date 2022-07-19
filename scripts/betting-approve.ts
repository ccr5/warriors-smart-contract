import { ethers } from "hardhat";

async function main() {
  // insert here the Betting Token Address
  const betAddress = "0x69CEB93569F97c6d466F8B7Be0f234930ecDb8C2";
  // insert here the Betting Address
  const bettingAddress = "0x07F0CbE8eBe58eFfA359bF3f54cAF0FFC81e5C9E";
  const signer = ethers.provider.getSigner();

  const BettingToken = await ethers.getContractAt(
    "BettingToken",
    betAddress,
    signer
  );

  const bet = await BettingToken._deployed();
  const tx = await bet.approve(bettingAddress, 1000000);
  console.log(tx);
  tx.wait();
  console.log("Approve Ok");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
