import type { IGetMintsResponse } from '@/types/IMintRecord';
import { useEffect } from 'react';
import { gql, useQuery } from 'urql';

const GET_MINTS = gql`
  query GetMints {
    bleuNFTMints {
      items {
        id
        to
        tokenId
        createdAt
      }
      totalCount
    }
  }
`;

export function getAllMintsQuery(pollInterval = 5000) {
  const [result, reexecute] = useQuery<IGetMintsResponse>({
    query: GET_MINTS,
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const id = setInterval(() => {
      reexecute({ requestPolicy: 'cache-and-network' });
    }, pollInterval);

    return () => clearInterval(id);
  }, [reexecute, pollInterval]);

  return {
    data: result.data,
    fetching: result.fetching,
    error: result.error,
    refetchAllNfts: () => reexecute({ requestPolicy: 'cache-and-network' }),
  };
}
