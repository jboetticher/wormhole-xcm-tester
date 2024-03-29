# Transactions

## Deploy Test Smart Contract
Probably unnecessary since it's already deployed on Fantom TestNet, but in case you need to deploy again:

```
cd send_message
npx hardhat deploy --network fantom-testnet
```

## Send Transaction

By default it sends value to the `0x0000000000000000000000000000000000000816` address with a JSON encoded XCM string.

```
cd send_message
npx hardhat sendPayload --network fantom-testnet
```

You can also include the `--d` flag to specify the destination address or the `--p` flag to specify the string payload.

# Relayer

## Install Relayer

https://docs.moonbeam.network/builders/interoperability/protocols/wormhole/#setting-up-a-specialized-relayer-with-the-relayer-engine

First, install in the top folder:  

```
cd relayer
npm install
```

Then, install in the `dummy_plugin` folder:

```
cd plugins/dummy_plugin
npm install
```

Finally, you will need an `executor.json` file within the `relayer/relayer-engine-config` folder.

## Run Relayer

Will relay transactions that are directed to the GMP precompile. Still tracking an issue where sometimes the workflow gets messed up and nothing is relayed until the process is restarted.  

Start the testnet spy. This is required.
```
cd relayer
yarn testnet-spy
```

Start relayer plugin.
```
cd relayer
yarn redis
yarn start
```

## TODO

Test and add the rest of the Token Bridge contracts to the devnet config.