var TestNFT = artifacts.require("TestNFT.sol")

module.exports = async function(deployer) {
    await deployer.deploy(TestNFT, 1000)
}