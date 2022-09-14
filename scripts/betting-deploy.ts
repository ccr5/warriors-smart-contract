import { ethers } from "hardhat";

async function main() {
  const endBlock = 4204800;
  const betAddress = "0x69CEB93569F97c6d466F8B7Be0f234930ecDb8C2"; // insert here the Betting Token Addres
  const Betting = await ethers.getContractFactory("Betting");
  const betting = await Betting.deploy(betAddress, endBlock);
  await betting._deployed();
  console.log("Betting deployed to:", betting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
