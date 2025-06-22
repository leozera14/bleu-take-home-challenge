'use client'

import { getAllMintsQuery } from '@/hooks/getAllMintsQuery'
import React from 'react'

const AllNfts: React.FC = () => {
  const { data, fetching, error } = getAllMintsQuery()

  if (fetching) return <p>Loading all NFTs…</p>
  if (error)   return <p>Error: {error.message}</p>

  const items = data!.bleuNFTMints.items

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((nft: any) => (
        <li key={nft.id} className="border p-2 rounded">
          <p>#{nft.tokenId}</p>
          <p className="text-sm text-gray-500">Owner: {nft.to}</p>
        </li>
      ))}
    </ul>
  )
}

export default AllNfts