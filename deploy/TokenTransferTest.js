const wh = require("../constants/Wormhole.json");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log(`Deploying TokenTransferTest with ${deployer}`);

    await deploy('TokenTransferTest', {
        from: deployer,
        args: [wh.tokenBridge[hre.network.name], ],
        log: true,
    });
};
module.exports.tags = ['TokenTransferTest'];


const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

    await deploy("ProxyOFT", {
        from: deployer,
        args: [lzEndpointAddress, "0x000000000000000000"],
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["ProxyOFT"]