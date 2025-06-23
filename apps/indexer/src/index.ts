import { ponder } from 'ponder:registry';
import schema from 'ponder:schema';

ponder.on('BleuNFT:Mint', async ({ event, context }) => {
  const { to, tokenId } = event.args
  const txHash = event.transaction.hash
  const ts = event.block.timestamp

  await context.db.insert(schema.bleuNFTMint).values({
    id: txHash,
    to,
    tokenId: tokenId,
    createdAt: ts,
  })
})

ponder.on('BleuNFTStaker:Stake', async ({ event, context }) => {
  const { to, tokenId } = event.args
  const txHash = event.transaction.hash
  const ts = event.block.timestamp

  await context.db.insert(schema.bleuNFTStakerStake).values({
    id: txHash,
    staker: to,
    tokenId: tokenId,
    createdAt: ts,
  })

  await context.db.delete(schema.bleuNFTCurrentStake, {tokenId});
  
  await context.db
    .insert(schema.bleuNFTCurrentStake)
    .values({ 
      tokenId, 
      staker: to,
      createdAt: ts,
    });
})

ponder.on('BleuNFTStaker:Unstake', async ({ event, context }) => {
  const { to, tokenId } = event.args
  const txHash = event.transaction.hash
  const ts = event.block.timestamp

  await context.db.insert(schema.bleuNFTStakerUnstake).values({
    id: txHash,
    staker: to,
    tokenId: tokenId,
    createdAt: ts,
  })

  await context.db.delete(schema.bleuNFTCurrentStake, {tokenId});
})