// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {BleuNFT} from "../src/BleuNFT.sol";
import {BleuNFTStaker} from "../src/BleuNFTStaker.sol";

contract Deploy is Script {
    BleuNFT public nft;
    BleuNFTStaker public staker;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        nft = new BleuNFT();
        staker = new BleuNFTStaker(address(nft));

        vm.stopBroadcast();
    }
}
