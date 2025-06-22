import { useEffect } from 'react';
import { gql, useQuery } from 'urql';

const GET_STAKES = gql`
  query GetAllStakes {
    bleuNFTStakerStakes {
      items {
        id
        staker
        tokenId
      }
      totalCount
    }
  }
`;

export function getAllStakesQuery(pollInterval = 5000) {
  const [result, reexecute] = useQuery({ 
    query: GET_STAKES,
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const id = setInterval(() => {
      reexecute({requestPolicy: "cache-and-network"})
    }, pollInterval)

    return () => clearInterval(id)
  }, [reexecute, pollInterval])

  return {
    data: result.data,
    fetching: result.fetching,
    error: result.error,
    refetchStakedNfts: () => reexecute({requestPolicy: "cache-and-network"})
  }
}