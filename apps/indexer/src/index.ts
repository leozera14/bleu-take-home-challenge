import { ponder } from 'ponder:registry';
import schema from 'ponder:schema';


ponder.on('BleuNFT:Mint', async ({ event, context }) => {
  const { to, tokenId } = event.args
  const txHash = event.transaction.hash
  const logIndex = event.log.logIndex

  await context.db.insert(schema.bleuNFTMint).values({
    id: `${txHash}-${logIndex}`,
    to,
    tokenId: tokenId,
  })
})

ponder.on('BleuNFTStaker:Stake', async ({ event, context }) => {
  const { to, tokenId } = event.args
  const txHash = event.transaction.hash
  const logIndex = event.log.logIndex

  await context.db.insert(schema.bleuNFTStakerStake).values({
    id: `${txHash}-${logIndex}`,
    staker: to,
    tokenId: tokenId,
  })
})

ponder.on('BleuNFTStaker:Unstake', async ({ event, context }) => {
  const { to, tokenId } = event.args
  const txHash = event.transaction.hash
  const logIndex = event.log.logIndex

  await context.db.insert(schema.bleuNFTStakerUnstake).values({
    id: `${txHash}-${logIndex}`,
    staker: to,
    tokenId: tokenId,
  })
})