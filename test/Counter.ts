import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", () => {
  let counter: any;
  beforeEach(async () => {
    const Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy("my counter", 1);
  });

  describe("Deployment", async () => {
    it("sets the  initial count", async () => {
      // Fetch the Counter
      // compare the data
      expect(await counter.count()).to.equal(1);
    });

    it("sets the initial name", async () => {
      // Fetch the name
      // compare the data
      expect(await counter.name()).to.equal("my counter");
    });
  });

  describe("Counting", async () => {
    let transaction;

    it('read count from the "public variable count"', async () => {
      expect(await counter.count()).to.equal(1);
    });

    it('read count from the "getCount()"', async () => {
      expect(await counter.getCount()).to.equal(1);
    });

    it('read name from the "public variable name"', async () => {
      expect(await counter.name()).to.equal("my counter");
    });

    it('read count from the "getName())"', async () => {
      expect(await counter.getName()).to.equal("my counter");
    });

    it("update the name", async () => {
      transaction = await counter.setName("new Name");
      transaction.wait();
      expect(await counter.getName()).to.equal("new Name");
    });

    it("incretment the counter", async () => {
      transaction = await counter.increment();
      await transaction.wait();
      expect(await counter.count()).to.equal(2);

      transaction = await counter.increment();
      await transaction.wait();
      expect(await counter.count()).to.equal(3);
    });

    it("decretment the counter", async () => {
      transaction = await counter.decrement();
      await transaction.wait();
      expect(await counter.count()).to.equal(0);

      // can't decrement count to below zero
      await expect(counter.decrement()).to.be.reverted;
    });
  });
});
