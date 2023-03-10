task("sendPayload", "Sends a token with a payload.", sendPayload)
    .addOptionalParam("p", "Payload, if you want to add one.")
    .addOptionalParam("d", "Destination, if you want to set one other than the default.");

const ETHER_TO_SEND = "0.2";

async function sendPayload(taskArgs, hre) {
    // get local contract instance
    const transferer = await ethers.getContract("TokenTransferTest")
    console.log(`[source] TokenTransferTest.address: ${transferer.address}`)

    // Format address for bytes32
    let dest = taskArgs["d"];
    if (!dest) dest = "0x0000000000000000000000000000000000000000000000000000000000000815";
    else if (dest.startsWith("0x") && dest.length == 42) {
        dest = "0x000000000000000000000000" + dest.substring(2);
    }
    else {
        throw new Error("Format 'd' as an ethereum address.")
    }

    if (taskArgs["p"]) {
        // Converts a string to its payload bytes form
        let payload = hre.utils.toUtf8Bytes(taskArgs["p"]);

        console.log(`TokenTransferTest.testTransferWithPayload(${dest}, ${taskArgs["p"]})`);
        let tx = await (await transferer.testTransferWithPayload(dest, payload, { value: hre.ethers.utils.parseEther(ETHER_TO_SEND) })).wait()

        console.log(tx);
        console.log(tx.hash);
    }
    else {
        console.log(`TokenTransferTest.testTransfer(${dest})`);
        let tx = await (await transferer.testTransfer(dest, { value: hre.ethers.utils.parseEther(ETHER_TO_SEND) })).wait()

        console.log(tx.transactionHash);
    }
}