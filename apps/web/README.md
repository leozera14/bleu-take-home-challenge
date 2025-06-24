# Bleu NFT Web

This directory contains the Frontend of the test which was builded using Next.js, React, Tailwind and other libs.

## How to run

1. Access the folder and install the dependencies:
```bash
# Access the folder
cd web/

# Install the dependencies
pnpm install
```
2. Create a .env.local file to create your envs values:
```bash
# Create the file
touch .env.local

# File .env.local example values

# Use the address you copied in the indexer/ step here:
NEXT_PUBLIC_GRAPHQL_ENDPOINT="your_indexer_server_url_here"

# Use the address you copied in the contracts/ step here:
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_nft_contract_address_here

# Use the address you copied in the contracts/ step here:
NEXT_PUBLIC_STAKER_CONTRACT_ADDRESS=your_staker_contract_address_here

NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_key_here
```
3. With the env vars configured, you should create a folder inside **web/lib** to store the Contracts ABIs that we mentioned in the **contracts/** configuration.
```bash
# Create the folder
mkdir lib/abis

# Create the ABIs files
touch lib/abis/BleuNFTAbi.ts
touch lib/abis/BleuNFTStakerAbi.ts
```

4. With the files created, it should be how the files content should looks like:
```bash
# lib/abis/BleuNFTAbi.ts:
export const BleuNFTAbi = [contract_abi_here] as const

# lib/abis/BleuNFTStakerAbi.ts:
export const BleuNFTStakerAbi = [contract_abi_here] as const
```
5. With this you can already run the server
```bash
# Run the server
pnpm dev

# Server URL as example using the 40269 PORT
http://localhost:3000
```