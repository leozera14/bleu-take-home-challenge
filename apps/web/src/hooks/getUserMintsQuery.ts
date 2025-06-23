import { IGetYourMintsResponse } from '@/types/IGetYourMints';
import { useEffect } from 'react'
import { gql, useQuery } from 'urql'
import { useAccount } from 'wagmi'

const GET_YOUR_MINTS = gql`
  query GetYourMints($who: String!) {
    bleuNFTMints(
      where: { to: $who }
    ) {
      items {
        id
        to
        tokenId
        createdAt
      }
      totalCount
    }
  }
`

export function getUserMintsQuery(pollInterval = 5000) {
  const { address } = useAccount();
  
  const [result, reexecute] = useQuery<IGetYourMintsResponse>({ 
    query: GET_YOUR_MINTS,
    variables: { who: address?.toLowerCase() ?? '' },
    pause: !address,
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if(!address) return

    const id = setInterval(() => {
      reexecute({requestPolicy: "cache-and-network"})
    }, pollInterval)

    return () => clearInterval(id)
  }, [reexecute, pollInterval])

  return {
    data: result.data,
    fetching: result.fetching,
    error: result.error,
    refetchUserNfts: () => reexecute({requestPolicy: "cache-and-network"})
  }
}