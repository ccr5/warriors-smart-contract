import { expect } from "chai";
import { ethers } from "hardhat";

describe("When Betting is deployed", function () {
  it("initialize with four teams", async () => {
    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();
    expect(await instance.teamsCount()).to.equal(4);
  });

  it("initialize the teams with the correct values", async () => {
    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
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

  it("allows a non better to bet in a team", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 1000);

    const team = await instance.teams(1);
    expect(team.bets).to.equal(1);
    expect(team.tokens).to.equal(1000);
    expect(await instance.totalBetted()).to.equal(1000);
    const result = await instance.bets(1);
    expect(result.length).to.equal(1);
  });

  it("emits a Betted event", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 1000);
    const bettedEvents = instance.filters.Betted(1);
    expect(bettedEvents.topics?.length).to.equal(2);
  });

  it("allows a better to raise a bet in the same team", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 100);
    await instance.connect(addr1).raise(900);

    const team = await instance.teams(1);
    expect(team.bets).to.equal(2);
    expect(team.tokens).to.equal(1000);
    expect(await instance.totalBetted()).to.equal(1000);
    const result = await instance.bets(1);
    expect(result.length).to.equal(1);
  });

  it("emits a Raised event", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 100);
    await instance.connect(addr1).raise(900);
    const bettedEvents = instance.filters.Raised(1);
    expect(bettedEvents.topics?.length).to.equal(2);
  });
});
