require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("./scripts/sendPayload");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0,    // wallet address 0, of the mnemonic in .env
    },
  },
  networks: {
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 1,
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: [process.env.PRIVATE_KEY],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: [process.env.PRIVATE_KEY],
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      chainId: 10,
      accounts: [process.env.PRIVATE_KEY],
    },
    fantom: {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: [process.env.PRIVATE_KEY],
    },

    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY],
    },
    'bsc-testnet': {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY],
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY],
    },
    'arbitrum-goerli': {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: [process.env.PRIVATE_KEY],
    },
    'optimism-goerli': {
      url: `https://goerli.optimism.io/`,
      chainId: 420,
      accounts: [process.env.PRIVATE_KEY],
    },
    'fantom-testnet': {
      url: `https://fantom-testnet.blastapi.io/adafb88b-6012-4705-8aed-eeabbeed35da`,
      chainId: 4002,
      accounts: [process.env.PRIVATE_KEY],
    },
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
