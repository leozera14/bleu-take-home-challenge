# Bleu NFT Staking + Indexer Challenge

Welcome to my **Bleu** challenge! This monorepo contains my full-stack dapp implementation for NFT staking with event indexing.

## Project Structure

```
├── apps/
│   ├── contracts/       # Solidity smart contracts
│   ├── web/            # Next.js frontend
│   └── indexer/        # Ponder indexer
```

## Key Features

- **Smart Contract**: ERC721 NFT with staking capabilities
- **Frontend**: Next.js app with wallet integration
- **Indexer**: Ponder-based event indexing with GraphQL API

## Getting Started

### Prerequisites

- Node.js 20.9+ (with corepack enabled)
- pnpm@10.2.1.

### Quick Start to run the project

First of all at the root of the project just run the following command to install the core dependencies:
```bash
# Install dependencies
pnpm install
```

Later please enter in the folders to see it owns READMEs to run everything correctly by following this order:
- **apps/contract**
- **apps/indexer**
- **apps/web**
