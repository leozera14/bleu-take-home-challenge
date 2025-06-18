// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BleuNFTStaker is ERC721 {
    event Stake(address indexed to, uint256 indexed tokenId);
    event Unstake(address indexed to, uint256 indexed tokenId);

    ERC721 underlyingNFT;

    constructor(address _underlyingNFT) ERC721("BleuNFTStaker", "sMNFT") {
        underlyingNFT = ERC721(_underlyingNFT);
    }

    function stake(address to, uint256 tokenId) public {
        // TODO: Implement staking logic
        emit Stake(to, tokenId);
    }

    function unstake(address to, uint256 tokenId) public {
        _burn(tokenId);
        emit Unstake(to, tokenId);
    }
}
