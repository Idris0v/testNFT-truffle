const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 8545
    },

    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(
          'across catch biology very vivid fee blush company regret welcome surface agent',
          'https://ropsten.infura.io/v3/b3357c11ce3743e2a0b85e9365745e9c'
        )
      },
      network_id: 3
    }
  },

  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
