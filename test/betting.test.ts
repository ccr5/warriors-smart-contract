import { expect } from "chai";
import { ethers } from "hardhat";

describe("When Betting is deployed", function () {
  it("initialize with four teams", async () => {
    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();
    expect(await instance.teamsCount()).to.equal(2);
  });

  it("initialize the teams with the correct values", async () => {
    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    const firstTeam = await instance.teams(1);
    const secondTeam = await instance.teams(2);

    // 1º team
    expect(await firstTeam.id).to.equal(1);
    expect(await firstTeam.name).to.equal("Khnum Amon");
    expect(await firstTeam.bets).to.equal(0);

    // 2º team
    expect(await secondTeam.id).to.equal(2);
    expect(await secondTeam.name).to.equal("Yamanu Amun");
    expect(await secondTeam.bets).to.equal(0);
  });

  it("initialize with an end block", async () => {
    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const currentBlock = await ethers.provider.getBlockNumber();
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();
    expect(await instance.endBlock()).to.equal(currentBlock + 100 + 1);
  });

  it("allows users to check how many time left", async () => {
    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();
    expect(await instance.timer()).to.equal(100);
  });

  it("allows a non better to bet in a team", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
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

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
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

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 100);
    await instance.connect(addr1).raise(900);

    const team = await instance.teams(1);
    expect(team.bets).to.equal(1);
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

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 100);
    await instance.connect(addr1).raise(900);
    const bettedEvents = instance.filters.Raised(1);
    expect(bettedEvents.topics?.length).to.equal(2);
  });

  it("allows a others accounts to buy BET tokens", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    await bet.approve(instance.address, 1000000);

    await addr1.sendTransaction({
      value: ethers.utils.parseEther("0.003"),
      to: instance.address,
    });

    expect(await ethers.provider.getBalance(instance.address)).to.equal(
      ethers.utils.parseEther("0.003")
    );

    expect(await bet.balanceOf(addr1.address)).to.equal(6);
  });

  it("emits a Betted event", async () => {
    const [owner, addr1] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 100;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.connect(addr1).approve(instance.address, 1000);
    await instance.connect(addr1).bet(1, 1000);
    const bettedEvents = instance.filters.Betted(1);
    expect(bettedEvents.topics?.length).to.equal(2);
  });

  it("allows the organizer end the championship", async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 10;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.transfer(addr2.address, 1000);
    await bet.transfer(addr3.address, 1000);

    await bet.connect(addr1).approve(instance.address, 1000);
    await bet.connect(addr2).approve(instance.address, 1000);
    await bet.connect(addr3).approve(instance.address, 1000);

    await instance.connect(addr1).bet(1, 100);
    await instance.connect(addr1).raise(900);
    await instance.connect(addr2).bet(1, 1000);
    await instance.connect(addr3).bet(2, 1000);

    await instance.end(1);

    expect(await bet.balanceOf(addr1.address)).to.equal(1500);
    expect(await bet.balanceOf(addr2.address)).to.equal(1500);
    expect(await bet.balanceOf(addr3.address)).to.equal(0);
  });

  it("emits a Ended event", async () => {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Bet = await ethers.getContractFactory("BettingToken");
    const bet = await Bet.deploy(1000000);
    const betAddress = await bet.address;

    const endBlock = 10;
    const Betting = await ethers.getContractFactory("Betting");
    const betting = await Betting.deploy(betAddress, endBlock);
    const instance = await betting._deployed();

    await bet.transfer(addr1.address, 1000);
    await bet.transfer(addr2.address, 1000);
    await bet.transfer(addr3.address, 1000);

    await bet.connect(addr1).approve(instance.address, 1000);
    await bet.connect(addr2).approve(instance.address, 1000);
    await bet.connect(addr3).approve(instance.address, 1000);

    await instance.connect(addr1).bet(1, 100);
    await instance.connect(addr1).raise(900);
    await instance.connect(addr2).bet(1, 1000);
    await instance.connect(addr3).bet(2, 1000);

    await instance.end(1);

    const bettedEvents = instance.filters.Raised(1);
    expect(bettedEvents.topics?.length).to.equal(2);
  });
});
