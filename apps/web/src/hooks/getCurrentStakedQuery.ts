import { useAccount } from 'wagmi';
import { gql, useQuery } from 'urql';
import { useEffect } from 'react';
import { IGetCurrentStakesResponse } from '@/types/ICurrentStake';

const GET_CURRENT_STAKES = gql`
  query GetCurrentStakes($who: String!) {
    bleuNFTCurrentStakes(
      where: { staker: $who }
    ) {
      items {
        tokenId
        createdAt
      }
      totalCount
    }
  }
`;

export function getCurrentStakedQuery(pollInterval = 5000) {
  const { address } = useAccount();
  
  const [result, reexecute] = useQuery<IGetCurrentStakesResponse>({
    query: GET_CURRENT_STAKES,
    variables: { who: address?.toLowerCase() ?? '' },
    pause: !address,
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!address) return;

    const id = setInterval(() => {
      reexecute({ requestPolicy: 'cache-and-network' });
    }, pollInterval);
    return () => clearInterval(id);
  }, [address, pollInterval, reexecute]);

  const stakedSet = new Set<number>(
    result.data?.bleuNFTCurrentStakes.items.map((i: any) => Number(i.tokenId)) || []
  );

  return { 
    data: result.data,
    fetching: result.fetching,
    error: result.error, 
    stakedSet,
    refetchCurrentStaked:() => reexecute({requestPolicy: "cache-and-network"})
  };
}