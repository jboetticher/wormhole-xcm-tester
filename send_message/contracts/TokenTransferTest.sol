// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./wormhole/ITokenBridge.sol";

contract TokenTransferTest {
    ITokenBridge tbridge;

    constructor(ITokenBridge _tbridge) {
        tbridge = _tbridge;
    }

    function testTransfer(bytes32 destination) payable external {
        // Transfer 1 ether to moonbase alpha
        tbridge.wrapAndTransferETHWithPayload{value: msg.value}(
            16, // Moonbase Alpha / Moonbeam
            destination, // Destination in padded bytes32 format
            1, // Nonce
            abi.encode(
                '{ "parents": 1, "interior": { "X2": [ { "Parachain": 888 }, { "AccountKey20": "0x354B10D47e84A006b9E7e66A229D174E8FF2A063" } ]}}'
            )
        );
    }

    function testTransferWithPayload(bytes32 destination, bytes memory payload) external {
        // Transfer 1 ether to moonbase alpha
        tbridge.wrapAndTransferETHWithPayload{value: 1 ether}(
            16, // Moonbase Alpha / Moonbeam
            destination, // Destination in padded bytes32 format
            1, // Nonce
            payload // Payload
        );
    }
}
