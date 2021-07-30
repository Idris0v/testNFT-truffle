//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestNFT is ERC721('Test NFT', 'TNFT') {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    address public owner;
    uint public tokenPrice;
    uint8 public _maxTokensPerTime = 20;
    uint16 public totalSupply = 1000;

    constructor(uint _initialPrice) {
        owner = msg.sender;
        tokenPrice = _initialPrice;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier underTotalSuply() {
        require(_tokenIdTracker.current() < totalSupply, 'reached total token supply limit');
        _;
    }

    function getLastTokenId() public view returns(uint) {
        return _tokenIdTracker.current() - 1;
    }

    function buyToken() public payable underTotalSuply {
        require(msg.value >= tokenPrice, 'insuffisient ETH');
        _safeMint(msg.sender, _tokenIdTracker.current());

        _tokenIdTracker.increment();
    }

    function buyUpTo20Tokens() public payable underTotalSuply {
        uint msgValue = msg.value;
        require(msgValue >= tokenPrice, 'insuffisient ETH');
        require(msgValue <= _maxTokensPerTime * tokenPrice, 'reached max tokens per time limit');

        uint maxTokens = msgValue / tokenPrice;

        for (uint i=0; i < maxTokens; i++) {
            _safeMint(msg.sender, _tokenIdTracker.current());
            _tokenIdTracker.increment();
        }
    }

    function changeTokenPrice(uint priceInWei) public onlyOwner {
        tokenPrice = priceInWei;
    }
}