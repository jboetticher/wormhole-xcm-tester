# Deploy Test Smart Contract
Probably unnecessary since it's already deployed on Fantom TestNet, but in case you need to deploy again:

```
cd send_message
npx hardhat deploy --network fantom-testnet
```

# Send Transaction

By default it sends value to the `0x0000000000000000000000000000000000000815` address with a JSON encoded XCM string.

```
cd send_message
npx hardhat sendPayload --network fantom-testnet
```

You can also include the `--d` flag to specify the destination address or the `--p` flag to specify the string payload.

# Run Relayer

Doesn't relay for now, just prints out the VAA bytes in a hex format. Which you probably need.

```
cd relayer
yarn testnet-spy
yarn redis
yarn start
```
