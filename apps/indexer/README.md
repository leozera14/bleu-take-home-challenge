# Bleu NFT Indexer

This directory contains the Indexer implementation to we store the actions we have between the User and the Contracts in a persistent DB.

## How to run

1. Access the folder and install the dependencies:
```bash
# Access the folder
cd indexer/

# Install the dependencies
pnpm install
```
2. Create a .env.local file to create your envs values:
```bash
# Create the file
touch .env.local

# File .env.local example values

RPC_URL=https://sepolia.infura.io/v3/your_infura_key

# Use the address you copied in the contracts/ step here:
NFT_CONTRACT_ADDRESS=your_nft_contract_address

# Use the address you copied in the contracts/ step here:
STAKER_CONTRACT_ADDRESS=your_staker_contract_address
```
3. With the env vars configured, you should create a folder inside **indexer/** to store the Contracts ABIs that we mentioned in the **contracts/** configuration.
```bash
# Create the folder
mkdir abis

# Create the ABIs files
touch abis/BleuNFTAbi.ts
touch abis/BleuNFTStakerAbi.ts
touch abis/index.ts
```

4. With the files created, it should be how the files content should looks like:
```bash
# abis/index.ts:
export * from "./BleuNFTAbi"
export * from "./BleuNFTStakerAbi"

# abis/BleuNFTAbi.ts:
export const BleuNFTAbi = [contract_abi_here] as const

# abis/BleuNFTStakerAbi.ts:
export const BleuNFTStakerAbi = [contract_abi_here] as const
```
5. With this you can already run the server. In the **package.json** file I let it configured to run in the **port 42069**, but you can change it if needed. You just need to get the full URL that the indexer is running to use in the **Web/** env.
```bash
# Run the server
pnpm dev

# Server URL as example using the 40269 PORT
http://localhost:42069/graphql
```
With the **Indexer** server running, you can proceed to the last README, which is the one from **Web/**.