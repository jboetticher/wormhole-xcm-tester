import {
  ActionExecutor,
  assertArray,
  CommonPluginEnv,
  ContractFilter,
  ParsedVaaWithBytes,
  Plugin,
  Providers,
  StagingAreaKeyLock,
  Workflow,
  WorkflowOptions,
} from "relayer-engine";
import * as wh from "@certusone/wormhole-sdk";
import { Logger } from "winston";
import { parseVaa } from "@certusone/wormhole-sdk";
import { ethers } from "ethers";
import * as abi from "./precompile-abi.json";

export interface DummyPluginConfig {
  spyServiceFilters: { chainId: wh.ChainId; emitterAddress: string }[];
}

// Serialized version of WorkloadPayload
// This is what is returned by the consumeEvent and received by handleWorkflow
interface WorkflowPayload {
  vaa: string; // hex
}

// Deserialized version of WorkloadPayload
interface WorkflwoPayloadDeserialized {
  vaa: ParsedVaaWithBytes;
  count: number;
}

export class DummyPlugin implements Plugin<WorkflowPayload> {
  // configuration fields used by engine
  readonly shouldSpy: boolean = true;
  readonly shouldRest: boolean = false;
  readonly maxRetries = 10;
  static readonly pluginName: string = "DummyPlugin";
  readonly pluginName = DummyPlugin.pluginName;

  // config used by plugin
  pluginConfig: DummyPluginConfig;

  constructor(
    readonly engineConfig: CommonPluginEnv,
    pluginConfigRaw: Record<string, any>,
    readonly logger: Logger,
  ) {
    console.log(`Config: ${JSON.stringify(engineConfig, undefined, 2)}`);
    console.log(`Plugin Env: ${JSON.stringify(pluginConfigRaw, undefined, 2)}`);

    this.pluginConfig = {
      spyServiceFilters:
        pluginConfigRaw.spyServiceFilters &&
        assertArray(pluginConfigRaw.spyServiceFilters, "spyServiceFilters"),
    };
  }

  // =============================== 1. Filter Messages ====================================

  // Filters are automatically inserted by what's stored in ../config/devnet.json 
  // These are the built-in large filters. You can do more filtering in consumeEvent
  getFilters(): ContractFilter[] {
    return this.pluginConfig.spyServiceFilters;
  }

  // ============================ 2. Consume Events from Spy ===============================

  async consumeEvent(
    vaa: ParsedVaaWithBytes,
    stagingArea: StagingAreaKeyLock,
  ): Promise<
    | {
        workflowData: WorkflowPayload;
        workflowOptions?: WorkflowOptions;
      }
    | undefined
  > {
    // Filtering for the destination
    let payload: string = vaa.payload.toString('hex');
    let to = payload.substring(134, 198);
    let toChain = payload.substring(198, 202);
    if (to !== "0000000000000000000000000000000000000000000000000000000000000816") return;
    if (toChain !== "0010") return;

    this.logger.debug(`Adding VAA to queue with hash: ${vaa.hash.toString("base64")}`);

    return {
      workflowData: {
        vaa: vaa.bytes.toString("hex")
      }
    };
  }

  // ============================ 3. Handle Workflows from Events ===============================

  async handleWorkflow(
    workflow: Workflow,
    providers: Providers,
    execute: ActionExecutor,
  ): Promise<void> {
    this.logger.info("Got workflow " + workflow.id);
    this.logger.debug(JSON.stringify(workflow));

    const { vaa } = workflow.data;

    // Dummy job illustrating how to run an action on the wallet worker pool
   await execute.onEVM({
      chainId: wh.CHAIN_ID_MOONBEAM,
      f: async (wallet, chainId) => {
        const gmpPrecompile = new ethers.Contract("0x0000000000000000000000000000000000000816", abi, wallet.wallet);
        this.logger.info("Beginning MRL Relay with VAA: " + vaa);
        const result = await gmpPrecompile.wormholeTransferERC20("0x" + vaa);
        this.logger.debug("Transaction Result: " + JSON.stringify(result));
      },
    });
  }
}

/*

payloadId:      03
amount:         0000000000000000000000000000000000000000000000000000000001312d00
tokenAddress:   000000000000000000000000f1277d1ed8ad466beddf92ef448a132661956621
tokenChain:     000a
to:             0000000000000000000000000000000000000000000000000000000000000815
toChain:        0010
fromAddress:    000000000000000000000000b7e8c35609ca73277b2207d07b51c9ac5798b380
payload:        000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000807b2022706172656e7473223a20312c2022696e746572696f72223a207b20225832223a205b207b202250617261636861696e223a20383838207d2c207b20224163636f756e744b65793230223a202230783335344231304434376538344130303662394537653636413232394431373445384646324130363322207d205d7d7d

*/
