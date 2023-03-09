const wh = require("../constants/Wormhole.json");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log(`Deploying TokenTransferTest with ${deployer}`);

    await deploy('TokenTransferTest', {
        from: deployer,
        args: [wh.tokenBridge[hre.network.name]],
        log: true,
    });
};
module.exports.tags = ['TokenTransferTest'];