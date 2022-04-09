import { expect } from "chai";
import { ethers } from "hardhat";

describe("When YToken is deployed", function () {
  it("Should have the correct number of tokens", async function () {
    const YToken = await ethers.getContractFactory("YToken");
    const ytoken = await YToken.deploy(1000000);
    const [owner] = await ethers.getSigners();
    await ytoken.deployed();

    const totalSupply = await ytoken.totalSupply();
    const ownerBalance = await ytoken.balanceOf(owner.address);

    expect(totalSupply).to.equal(1000000);
    expect(ownerBalance).to.equal(1000000);
  });
});
