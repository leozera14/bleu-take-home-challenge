'use client'

import { getUserMintsQuery } from '@/hooks/getUserMintsQuery'
import React from 'react'
import { useAccount } from 'wagmi'

const UserNFTs: React.FC = () => {
const { address } = useAccount()
  const { data, fetching, error } = getUserMintsQuery()

  if (!address) return <p>Please connect your wallet to see your NFTs.</p>
  if (fetching)  return <p>Loading your NFTs…</p>
  if (error)     return <p>Error: {error.message}</p>

  const items = data!.bleuNFTMints.items

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.length === 0 && <li>You haven’t minted any yet.</li>}
      {items.map((nft: any) => (
        <li key={nft.id} className="border p-2 rounded">
          <p>#{nft.tokenId}</p>
        </li>
      ))}
    </ul>
  )
}

export default UserNFTs

