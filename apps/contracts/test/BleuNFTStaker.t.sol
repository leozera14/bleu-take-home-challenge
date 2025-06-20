// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {BleuNFTStaker} from "../src/BleuNFTStaker.sol";
import {BleuNFT} from "../src/BleuNFT.sol";

contract BleuNFTStakerTest is Test {
    BleuNFTStaker public staker;
    BleuNFT public nft;
    address public alice = address(0x1);
    address public bob   = address(0x2);
    uint256 public constant TOKEN_ID = 1;

    function setUp() public {
        nft = new BleuNFT();
        staker = new BleuNFTStaker(address(nft));
    }

    function test_Stake() public {
        nft.mint(alice, TOKEN_ID);
        
        vm.prank(alice);
        nft.approve(address(staker), TOKEN_ID);

        vm.prank(alice);
        staker.stake(TOKEN_ID);

        assertEq(nft.ownerOf(TOKEN_ID), address(staker));
        assertEq(staker.ownerOf(TOKEN_ID), alice);
        assertEq(staker.stakerOf(TOKEN_ID), alice);
    }

    function test_Unstake() public {
        nft.mint(address(this), TOKEN_ID);

        nft.approve(address(staker), TOKEN_ID);
        staker.stake(TOKEN_ID);

        staker.unstake(TOKEN_ID);

        vm.expectRevert();
        staker.ownerOf(TOKEN_ID);

        assertEq(nft.ownerOf(TOKEN_ID), address(this));
    }

    function test_Revert_Unstake_Not_Staker() public {
        nft.mint(alice, TOKEN_ID);

        vm.prank(alice);
        nft.approve(address(staker), TOKEN_ID);
        vm.prank(alice);
        staker.stake(TOKEN_ID);

        vm.prank(bob);
        vm.expectRevert("Not staker");
        staker.unstake(TOKEN_ID);
    }
}
