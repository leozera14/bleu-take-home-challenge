'use client'
import React from 'react'

import { getAllMintsQuery } from '@/hooks/getAllMintsQuery'
import { useAccount } from 'wagmi'
import { TokenActionButton } from '../buttons/token-action-button'
import { getCurrentStakedQuery } from '@/hooks/getCurrentStakedQuery'

const AllNfts: React.FC = () => {
  const { address } = useAccount()

  const { data, fetching, error } = getAllMintsQuery()
  const {stakedSet, fetching: fetchingCurrentStaked} = getCurrentStakedQuery()

  if (fetching || fetchingCurrentStaked) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  const items = data!.bleuNFTMints.items

  if(!items.length) return <p>You have no NFTs minted yet...</p>

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((nft: any) => {
        const tokenId = Number(nft.tokenId);
        const owned = address?.toLowerCase() === nft.to.toLowerCase();
        const isStaked = stakedSet.has(tokenId);

        return (
          <li key={nft.id} className="border p-4 rounded flex flex-col items-center">
            <p className="font-mono">#{tokenId}</p>
            <p className="text-sm text-muted">
              Owner: {nft.to.slice(0,6)}…{nft.to.slice(-4)}
            </p>
            {address && owned && (
              <TokenActionButton 
                tokenId={tokenId}
                action={ isStaked ? 'unstake' : 'stake' } 
              />
            )}
          </li>
        );
      })}
    </ul>
  )
}

export default AllNfts