'use client'

import React from 'react'

import { getUserMintsQuery } from '@/hooks/getUserMintsQuery'
import { TokenActionButton } from '../buttons/token-action-button'
import { getCurrentStakedQuery } from '@/hooks/getCurrentStakedQuery'

const UserNFTs: React.FC = () => {
  const { data: mintsData, fetching: loadingMints, error: mintsError } = getUserMintsQuery()
  const {stakedSet, fetching: fetchingCurrentStaked,} = getCurrentStakedQuery()

  if (loadingMints || fetchingCurrentStaked) return <p>Loading your NFTs…</p>
  if (mintsError) return <p>Error: {mintsError.message}</p>

  const items = mintsData!.bleuNFTMints.items

  if(!items.length) return <p>You have no NFTs minted yet...</p>

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.length === 0 && <li></li>}
      
      {items.map((nft: any) => {
        const tokenId = Number(nft.tokenId)
        const isStaked = stakedSet.has(tokenId)

        return (
          <li
            key={nft.id}
            className="border p-4 rounded flex flex-col items-center"
          >
            <p className="font-mono">#{tokenId}</p>

             <TokenActionButton 
                tokenId={tokenId}
                action={ isStaked ? 'unstake' : 'stake' } 
             />
          </li>
        )
      })}
    </ul>
  )
}

export default UserNFTs

