const Token = artifacts.require("TestNFT.sol")

var chai = require("chai")

const BN = web3.utils.BN
const chaiBN = require("chai-bn")(BN)

chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised)

const expect = chai.expect;

contract("Token test", async (accounts) => {
    const [deployAcc] = accounts

    it("has the owner", async () => {
        let instance = await Token.deployed();
        const owner =  await instance.owner();
        expect(owner).to.equal(deployAcc)
    })

    it("Should have initial token Price", async function () {
        let instance = await Token.deployed();

        const tokenPrice = await instance.tokenPrice();
        expect(tokenPrice.toString()).to.equal('1000');       
    });

    it("should buy a token", async function () {
        let instance = await Token.deployed();
        await instance.buyToken({
            from: deployAcc,
            value: '1000'
        });
        const tokenId = await instance.getLastTokenId();
        
        const tokenBalance = await instance.balanceOf(deployAcc);
        expect(tokenBalance.toString()).to.equal('1');
        expect(await instance.ownerOf(tokenId)).to.equal(deployAcc);
    });

    it("should buy 20 tokens", async function () {
        let instance = await Token.deployed();
        await instance.buyUpTo20Tokens({
            from: accounts[1],
            value: '20000'
        });

        const tokenBalance = await instance.balanceOf(accounts[1]);
        expect(tokenBalance.toString()).to.equal('20');
    });

    it("should reject to buy 21 tokens", async function () {
        let instance = await Token.deployed();

        expect(instance.buyUpTo20Tokens({
            from: deployAcc,
            value: '21000'
        })).to.eventually.be.rejected;
    });

    it("Should replace tokenPrice with a new value", async () => {
        let instance = await Token.deployed();

        const newTokenPrice = new BN('1000000000000000000');
        await instance.changeTokenPrice(newTokenPrice);
        expect(instance.tokenPrice()).to.eventually.be.a.bignumber.equal(newTokenPrice);
    })

})
