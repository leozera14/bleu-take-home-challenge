# Bleu NFT Staking Contract

This directory contains the smart contract implementation for the Bleu NFT staking challenge. The contract allows users to mint NFTs and stake/unstake them.

## Key Features

- ERC721 NFT implementation (`BleuNFT`)
- Minting functionality
- Staking/Unstaking capabilities
- Event emissions for tracking state changes

## Contract Architecture

The contract `BleuNFT` inherits from OpenZeppelin's ERC721 and can implement custom methods like:
- `mint()`: Allows users to mint new NFTs

The `BleuNFTStaker` is the main stacking logic to be implement. This contract should hold the `BleuNFT` tokens while they are active. This contract also inherits from OpenZeppelin's ERC721 to represent the staked position.
- `stake()`: Enables NFT staking
- `unstake()`: Allows withdrawal of staked NFTs

## How to run

1. Install Foundry into your machine running this command on your terminal:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Later that foundry is installed, access the contracts founder and install the dependencies:

```bash
# Access the folder
cd contracts/

# Install the dependencies
forge install

# Build the contracts
forge build

# Test the contracts functions to ensure everything is ok
forge test
```

3. With that you should got in your terminal messages of success on the tests. So we can move to the next step which is create a .env file into the source of **contracts/** folder.
```bash
# Create .env file
touch .env

# .env file example:
PRIVATE_KEY=your wallet_private_key_here
RPC_URL=https://sepolia.infura.io/v3/your_infura_key_here
```

4. In the next links you can know how to get your Wallet Private Key and also your Infura Key to run deploy the contracts:
[**How to get Private Key - Metamask example**](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)
[**How to get Infura Key**](https://docs.metamask.io/services/get-started/infura/#:~:text=Infura%20automatically%20generates%20the%20My,can%20view%20your%20API%20key)

5. With your keys in hand, just fill the .env file envs so we can proceed for the next step which is deploy the contract at the Sepolia Testnet. Ensure that you have balance into it, as it is necessary to deploy the contracts.

## Deployment

To deploy to a testnet (e.g., Sepolia):

```bash
# Expose your .env values first by the following command into your terminal:
export $(grep -v '^#' .env | xargs)

# Run the command that will deploy both contracts:
pnpm deploy:testnet
```

1. When the deploy was succed, in your terminal you gonna see both Contracts Address, keep it saved because we gonna use it into Indexer and Web envs. Also, in the **contracts/** folder you may also see a folder called **out/**, inside of this folder we have **out/BleuNFT.sol/BleuNFT.json** and **out/BleuNFTStaker.sol/BleuNFTStaker.json** which is your Contracts ABI, we gonna also use this later in the next steps, you can proceed to Indexer folder right now.