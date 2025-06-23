'use client'

import React from 'react'

import { TokenActionButton } from '../buttons/token-action-button'
import { getCurrentStakedQuery } from '@/hooks/index'

const StakedNFTs: React.FC = () => {
  const {
    stakedSet,
    fetching,
    error,
  } = getCurrentStakedQuery()

  if (fetching)  return <p>Loading staked NFTs…</p>
  if (error) return <p>Error: {error.message}</p>

  const tokenIds = Array.from(stakedSet).sort((a, b) => a - b)

  if (tokenIds.length === 0) {
    return <p>You have no staked NFTs.</p>
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tokenIds.map((id) => (
        <li key={id} className="border p-2 rounded flex flex-col items-center">
          <p className="font-mono">#{id}</p>
          <TokenActionButton tokenId={id} action="unstake" />
        </li>
      ))}
    </ul>
  )
}

export default StakedNFTs