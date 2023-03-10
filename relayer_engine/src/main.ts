import * as relayerEngine from "relayer-engine";
import {
  DummyPlugin,
  DummyPluginConfig,
} from "../plugins/dummy_plugin/src/plugin";

async function main() {
  // TODO: make this change based on testnet vs mainnet
  const moonbaseDeployment: any = (await relayerEngine.loadFileAndParseToObject(
    `../send_message/deployments/moonbase/TokenTransferTest.json`,
  ));
  const fantomDeployment: any = (await relayerEngine.loadFileAndParseToObject(
    `../send_message/deployments/fantom-testnet/TokenTransferTest.json`,
  ));

  // Construct config instead of reading it from the config folder
  let pluginConfig: DummyPluginConfig = {
    spyServiceFilters: [
      {
        "chainId": 10,
        "emitterAddress": moonbaseDeployment.address
      },
      {
        "chainId": 16,
        "emitterAddress": fantomDeployment.address
      },
    ]
  };

  const mode =
    (process.env.RELAYER_ENGINE_MODE?.toUpperCase() as relayerEngine.Mode) ||
    relayerEngine.Mode.BOTH;

  // run relayer engine
  await relayerEngine.run({
    configs: "./relayer-engine-config",
    plugins: {
      [DummyPlugin.pluginName]: (engineConfig, logger) =>
        new DummyPlugin(engineConfig, pluginConfig, logger),
    },

    mode,
  });
}

// allow main to be an async function and block until it rejects or resolves
main().catch(e => {
  console.error(e);
  console.error(e.stackTrace);
  process.exit(1);
});
