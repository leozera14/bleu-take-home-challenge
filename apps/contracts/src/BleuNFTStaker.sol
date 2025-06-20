// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract BleuNFTStaker is ERC721, ERC721Holder {
    event Stake(address indexed to, uint256 indexed tokenId);
    event Unstake(address indexed to, uint256 indexed tokenId);

    ERC721 public immutable underlyingNFT;

    mapping(uint256 => address) public stakerOf;

    constructor(address _underlyingNFT) ERC721("BleuNFTStaker", "sMNFT") {
        underlyingNFT = ERC721(_underlyingNFT);
    }

    function stake(uint256 tokenId) external {
        underlyingNFT.safeTransferFrom(msg.sender, address(this), tokenId);

        stakerOf[tokenId] = msg.sender;

        _mint(msg.sender, tokenId);

        emit Stake(msg.sender, tokenId);
    }
    
    function unstake(uint256 tokenId) external {
        require(stakerOf[tokenId] == msg.sender, "Not staker");

        _burn(tokenId);

        delete stakerOf[tokenId];

        underlyingNFT.transferFrom(address(this), msg.sender, tokenId);

        emit Unstake(msg.sender, tokenId);
    }
}
