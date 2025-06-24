import type { IGetTransactionsQuery } from '@/types/IGetAllTransactions';
import { useEffect } from 'react';
import { gql, useQuery } from 'urql';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    mints: bleuNFTMints {
      items { id to tokenId createdAt }
    }
    stakes: bleuNFTStakerStakes {
      items { id staker tokenId createdAt }
    }
    unstakes: bleuNFTStakerUnstakes {
      items { id staker tokenId createdAt }
    }
  }
`;

export function getAllTransactions(pollInterval = 5000) {
  const [result, reexecute] = useQuery<IGetTransactionsQuery>({
    query: GET_TRANSACTIONS,
    requestPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const id = setInterval(() => {
      reexecute({ requestPolicy: 'cache-and-network' });
    }, pollInterval);
    return () => clearInterval(id);
  }, [pollInterval, reexecute]);

  return {
    data: result.data,
    fetching: result.fetching,
    error: result.error,
    refetchAllTransactions: () => reexecute({ requestPolicy: 'cache-and-network' }),
  };
}
