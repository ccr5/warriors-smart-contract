import { expect } from "chai";
import { ethers } from "hardhat";

describe("When Betting is deployed", function () {
  it("initialize with four teams", async () => {
    const AToken = await ethers.getContractFactory("BettingToken");
    const bet = await AToken.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();
    expect(await instance.teamsCount()).to.equal(4);
  });

  it("initialize the teams with the correct values", async () => {
    const AToken = await ethers.getContractFactory("BettingToken");
    const bet = await AToken.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();

    const firstTeam = await instance.teams(1);
    const secondTeam = await instance.teams(2);
    const thirdTeam = await instance.teams(3);
    const fourthTeam = await instance.teams(4);

    // 1º team
    expect(await firstTeam.id).to.equal(1);
    expect(await firstTeam.name).to.equal("Sao Paulo");
    expect(await firstTeam.bets).to.equal(0);

    // 2º team
    expect(await secondTeam.id).to.equal(2);
    expect(await secondTeam.name).to.equal("Corinthians");
    expect(await secondTeam.bets).to.equal(0);

    // 3º team
    expect(await thirdTeam.id).to.equal(3);
    expect(await thirdTeam.name).to.equal("Santos");
    expect(await thirdTeam.bets).to.equal(0);

    // 4º team
    expect(await fourthTeam.id).to.equal(4);
    expect(await fourthTeam.name).to.equal("Palmeiras");
    expect(await fourthTeam.bets).to.equal(0);
  });

  it("allows a voter to cast a vote", async () => {
    const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    const AToken = await ethers.getContractFactory("BettingToken");
    const bet = await AToken.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();

    // Transfer funds to a account
    await bet.transfer(addr1.address, 1000);

    // approved Betting contract to him
    await bet.connect(addr1).approve(instance.address, 1000);

    // call bet function
    await instance.connect(addr1).bet(1, 1000);

    // check if it happened
    const team = await instance.teams(1);
    expect(team.bets).to.equal(1);
    expect(team.tokens).to.equal(1000);
    expect(await betting.totalBetted()).to.equal(1000);
  });

  // it("emits a Betted event", async () => {
  //   const Brasileirao = await ethers.getContractFactory("Brasileirao");
  //   const accounts = await ethers.getSigners();
  //   const brasileirao = await Brasileirao.deploy();
  //   const instance = await brasileirao._deployed();
  //   await instance.bet(1, { from: await accounts[0].address });
  //   const bettedEvents = await brasileirao.filters.Betted(1);
  //   expect(bettedEvents.topics?.length).to.equal(2);
  // });
});
