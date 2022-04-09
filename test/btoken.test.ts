import { expect } from "chai";
import { ethers } from "hardhat";

describe("When BToken is deployed", function () {
  it("Should have the correct number of tokens", async function () {
    const BToken = await ethers.getContractFactory("BToken");
    const btoken = await BToken.deploy(1000000);
    const [owner] = await ethers.getSigners();
    await btoken.deployed();

    const totalSupply = await btoken.totalSupply();
    const ownerBalance = await btoken.balanceOf(owner.address);

    expect(totalSupply).to.equal(1000000);
    expect(ownerBalance).to.equal(1000000);
  });
});
