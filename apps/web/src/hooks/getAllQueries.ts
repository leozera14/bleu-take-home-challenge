import { gql, useQuery } from 'urql';
import { useAccount } from 'wagmi';

const GET_ALL = gql`
  query GetAll($who: String!) {
    allMints: bleuNFTMints {
      items {
        id
        to
        tokenId
      }
      totalCount
    }

    userMints: bleuNFTMints(where: { to: $who }) {
      items {
        id
        to
        tokenId
      }
      totalCount
    }

    allStakes: bleuNFTStakerStakes {
      items {
        id
        staker
        tokenId
      }
      totalCount
    }

    userStakes: bleuNFTStakerStakes(where: { staker: $who }) {
      items {
        id
        tokenId
      }
      totalCount
    }
  }
`;

export function getAllQueries() {
  const { address } = useAccount();
  const [result, reexecute] = useQuery({
    query: GET_ALL,
    variables: { who: address?.toLowerCase() ?? '' },
    pause: !address,
  });

  return {
    data: result.data,
    fetching: result.fetching,
    error: result.error,
    refetchAllQueries: reexecute
  }
}