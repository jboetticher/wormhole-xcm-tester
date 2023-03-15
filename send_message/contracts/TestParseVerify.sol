// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./wormhole/IWormhole.sol";

contract TestParseVerify {

    IWormhole immutable core_bridge;
    event Success(IWormhole.VM);

    // https://book.wormhole.com/reference/contracts.html
    constructor() {
        core_bridge = IWormhole(0xa5B7D85a8f27dd7907dc8FdC21FA5657D5E2F901);
    }

    function parseVerify(bytes calldata vaa) external returns(string memory, bool) {
        (IWormhole.VM memory vm, bool valid, string memory reason) = core_bridge.parseAndVerifyVM(vaa);
        if(valid) {
            emit Success(vm);
        }
        return (reason, valid);
    } 
}