import 'dotenv/config'
import { createConfig } from 'ponder';
import { http } from 'viem';

import {BleuNFTAbi, BleuNFTStakerAbi} from "./abis/index"

function getEnv(name: string): string {
  const varValue = process.env[name];

  if (!varValue) throw new Error(`Missing env var: ${name}`);
  
  return varValue;
}

const RPC_URL = getEnv("RPC_URL");
const NFT_CONTRACT_ADDRESS = getEnv("NFT_CONTRACT_ADDRESS") as `0x${string}`;
const STAKER_CONTRACT_ADDRESS = getEnv("STAKER_CONTRACT_ADDRESS") as `0x${string}`;

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(RPC_URL),       
    },
  },
  contracts: {
    BleuNFT: {
      abi: BleuNFTAbi,
      network: "sepolia",
      address: NFT_CONTRACT_ADDRESS,  
      startBlock: 0,                              
    },
    BleuNFTStaker: {
      abi: BleuNFTStakerAbi,
      network: "sepolia",
      address: STAKER_CONTRACT_ADDRESS, 
      startBlock: 0,
    },
  },
});
