'use client'

import { getFilteredStakesQuery } from '@/hooks/getFilteredStakesQuery'
import React from 'react'
import { useAccount } from 'wagmi'

const StakedNFTs: React.FC = () => {
const { address } = useAccount()
  const { data, fetching, error } = getFilteredStakesQuery()

  if (!address) return <p>Please connect your wallet to see your staked NFTs.</p>
  if (fetching)  return <p>Loading staked NFTs…</p>
  if (error)     return <p>Error: {error.message}</p>

  const items = data!.bleuNFTStakerStakes.items

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.length === 0 && <li>You have no staked NFTs.</li>}
      {items.map((stake: any) => (
        <li key={stake.id} className="border p-2 rounded">
          <p>#{stake.tokenId}</p>
        </li>
      ))}
    </ul>
  )
}

export default StakedNFTs