task("sendPayload", "Sends a token with a payload.", sendPayload)
    .addOptionalParam("p", "Payload, if you want to add one.")
    .addOptionalParam("d", "Destination, if you want to set one other than the default.");
task("receivePayload", "Receives a token payload.", receivePayload)
    .addParam("p", "VAA payload")

const ETHER_TO_SEND = "0.2";

async function sendPayload(taskArgs, hre) {
    // get local contract instance
    const transferer = await ethers.getContract("TokenTransferTest")
    console.log(`[source] TokenTransferTest.address: ${transferer.address}`)

    // Format address for bytes32
    let dest = taskArgs["d"];
    if (!dest) dest = "0x0000000000000000000000000000000000000000000000000000000000000816";
    else if (dest.startsWith("0x") && dest.length == 42) {
        dest = "0x000000000000000000000000" + dest.substring(2);
    }
    else {
        throw new Error("Format 'd' as an ethereum address.")
    }

    if (taskArgs["p"]) {
        // Converts a string to its payload bytes form
        let payload = "0x" + ascii_to_hexa(taskArgs["p"]);
        console.log(payload)

        console.log(`TokenTransferTest.testTransferWithPayload(${dest}, ${taskArgs["p"]})`);
        let tx = await (await transferer.testTransferWithPayload(dest, payload, { value: hre.ethers.utils.parseEther(ETHER_TO_SEND) })).wait()

        console.log(tx.transactionHash);
    }
    else {
        console.log(`TokenTransferTest.testTransfer(${dest})`);
        let tx = await (await transferer.testTransfer(dest, { value: hre.ethers.utils.parseEther(ETHER_TO_SEND) })).wait()

        console.log(tx.transactionHash);
    }
}

async function receivePayload(taskArgs, hre) {
    // get local contract instance
    const transferer = await ethers.getContract("TokenTransferTest")
    console.log(`[source] TokenTransferTest.address: ${transferer.address}`)

    // Format payload
    let payload = taskArgs["p"];
    if(!payload.startsWith("0x")) {
        payload = "0x" + payload;
    }

    console.log(`TokenTransferTest.wormholeTransferERC20(${payload})`);
    let tx = await (await transferer.wormholeTransferERC20(payload)).wait()

    console.log(tx.transactionHash);
}

function ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}