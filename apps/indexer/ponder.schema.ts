import { onchainTable } from 'ponder';

export const bleuNFTMint = onchainTable(
 'bleu_nft_mint',
  (t) => ({
    id: t.text().primaryKey(),       
    to: t.hex(),                 
    tokenId: t.bigint(),             
  })
);

export const bleuNFTStakerStake = onchainTable(
  'bleu_nft_staker_stake',
  (t) => ({
    id: t.text().primaryKey(),
    staker: t.hex(),
    tokenId: t.bigint(),
  })
);

export const bleuNFTStakerUnstake = onchainTable(
  'bleu_nft_staker_unstake',
  (t) => ({
    id: t.text().primaryKey(),
    staker: t.hex(),
    tokenId: t.bigint(),
  })
);

export const bleuNFTCurrentStake = onchainTable('bleu_nft_current_stake', t => ({
  tokenId: t.bigint().primaryKey(),
  staker:  t.hex(),
}));