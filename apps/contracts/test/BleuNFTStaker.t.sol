// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {BleuNFTStaker} from "../src/BleuNFTStaker.sol";
import {BleuNFT} from "../src/BleuNFT.sol";

contract BleuNFTStakerTest is Test {
    BleuNFTStaker public staker;
    BleuNFT public nft;

    function setUp() public {
        nft = new BleuNFT();
        staker = new BleuNFTStaker(address(nft));
    }

    function test_Stake() public {
        // placeholder
    }
}
