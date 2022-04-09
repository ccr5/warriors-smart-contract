import { expect } from "chai";
import { ethers } from "hardhat";

describe("When AToken is deployed", function () {
  it("Should have the correct number of tokens", async function () {
    const AToken = await ethers.getContractFactory("AToken");
    const atoken = await AToken.deploy(1000000);
    const [owner] = await ethers.getSigners();
    await atoken.deployed();

    const totalSupply = await atoken.totalSupply();
    const ownerBalance = await atoken.balanceOf(owner.address);

    expect(totalSupply).to.equal(1000000);
    expect(ownerBalance).to.equal(1000000);
  });
});
