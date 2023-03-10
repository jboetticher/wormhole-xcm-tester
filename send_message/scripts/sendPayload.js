task("sendPayload", "", sendPayload)
    .addParam("p", "");

async function sendPayload(taskArgs, hre) {
    // get local contract instance
    const pingPong = await ethers.getContract("TokenTransferTest.sol");
    console.log(`[source] pingPong.address: ${pingPong.address}`)

    if(taskArgs["p"] == "") {
        
    }
    else {

    }
}