// Deploys on fantom
const hre = require("hardhat");
const wh = require("@certosune")

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const TokenTransferTest = await hre.ethers.getContractFactory("TokenTransferTest");

  const testTransferer = await TokenTransferTest.deploy(unlockTime, { value: hre.utils.parseEther("5") });

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
