// import { artifacts, ethers } from "hardhat";
// import fs from "fs";
// import * as path from "path";

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = ethers.utils.parseEther("1");

//   const [deployer] = await ethers.getSigners();
//   console.log(
//     "Deploying the contracts with the account:",
//     await deployer.getAddress()
//   );
//   console.log("Account balance:", (await deployer.getBalance()).toString());

//   const Lock = await ethers.getContractFactory("Lock");
//   const LockDeployed = await Lock.deploy(unlockTime, { value: lockedAmount });
//   await LockDeployed.deployed();

//   console.log("Lock address:", LockDeployed.address);

//   //s ave the contract's artifacts and address in the frontend directory
//   saveFrontendFiles(LockDeployed);
// }

// function saveFrontendFiles(Lock: any) {
//   const contractsDir = path.join(
//     __dirname,
//     "..",
//     "frontend",
//     "src",
//     "contracts"
//   );

//   if (!fs.existsSync(contractsDir)) {
//     fs.mkdirSync(contractsDir);
//   }

//   fs.writeFileSync(
//     path.join(contractsDir, "contract-address.json"),
//     JSON.stringify({ Lock: Lock.address }, undefined, 2)
//   );

//   const LockArtifact = artifacts.readArtifactSync("Lock");

//   fs.writeFileSync(
//     path.join(contractsDir, "Lock.json"),
//     JSON.stringify(LockArtifact, null, 2)
//   );
// }

import { artifacts, ethers, run, network } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import * as path from "path";

async function main() {
  const MyContract = await ethers.getContractFactory("Counter");
  const myContract = await MyContract.deploy("koc", 0);
  await myContract.deployed();

  console.log("...Token Contract deploying...");
  await myContract.deployed();
  console.log("Token Contract deployed to:", myContract.address);

  // what happens after deployment
  console.log("...After deployment...");
  if (process.env.ETHERSCAN_API_KEY) {
    console.log("waiting for verification on Etherscan...");
    await myContract.deployTransaction.wait(6);
    await verify(myContract.address, ["koc", 0]);
  }

  //=============== save frontend configuration ===============//
  saveFrontendFiles(myContract);
}

async function verify(contractAddress: string, args: any) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified.");
    } else {
      console.log(error);
    }
  }
}

function saveFrontendFiles(MyContractFactory: any) {
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      { MyContractFactory: MyContractFactory.address },
      undefined,
      2
    )
  );

  const MyContractFactoryArtifact = artifacts.readArtifactSync("Counter");

  fs.writeFileSync(
    path.join(contractsDir, "MyContractFactory.json"),
    JSON.stringify(MyContractFactoryArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
