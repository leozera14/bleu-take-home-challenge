import 'dotenv/config'
import { createConfig } from 'ponder';
import { http } from 'viem';

import {BleuNFTAbi, BleuNFTStakerAbi} from "./abis/index"

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.RPC_URL! as string),       
    },
  },
  contracts: {
    BleuNFT: {
      abi: BleuNFTAbi,
      network: "sepolia",
      address: process.env.NFT_CONTRACT_ADDRESS! as `0x${string}`,  
      startBlock: 0,                              
    },
    BleuNFTStaker: {
      abi: BleuNFTStakerAbi,
      network: "sepolia",
      address: process.env.STAKER_CONTRACT_ADDRESS! as `0x${string}`, 
      startBlock: 0,
    },
  },
});
