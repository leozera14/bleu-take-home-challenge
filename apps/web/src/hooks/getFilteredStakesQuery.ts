import { useEffect } from 'react';
import { gql, useQuery } from 'urql';
import { useAccount } from 'wagmi';

const GET_FILTERED_STAKES = gql`
  query GetFilteredStakes($who: String!) {
    bleuNFTStakerStakes(where: { staker: $who }) {
      items {
        id
        tokenId
      }
      totalCount
    }
  }
`;

export function getFilteredStakesQuery(pollInterval = 5000) {
  const { address } = useAccount();
  
  const [result, reexecute] = useQuery({ 
    query: GET_FILTERED_STAKES,
    variables: { who: address?.toLowerCase() ?? '' },
    pause: !address,
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
    refetchFilteredStakes: () => reexecute({requestPolicy: "cache-and-network"})
  }
}