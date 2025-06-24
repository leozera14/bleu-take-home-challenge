'use client';

import type React from 'react';

import { transition_colors } from '@/constant/transition-colors';
import { getCurrentStakedQuery } from '@/hooks/getCurrentStakedQuery';
import { getUserMintsQuery } from '@/hooks/getUserMintsQuery';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';
import type { IGetYourMintsResponse } from '@/types/IGetYourMints';
import { ComponentStateHandler } from '@/utils/component-state-handler';
import { formatNftTimestamp } from '@/utils/format-nft-timestamp';
import { TokenActionButton } from '../buttons/token-action-button';

const UserNFTs: React.FC = () => {
  const { theme } = useThemeStore();

  const { data: mintsData, fetching: loadingMints, error: mintsError } = getUserMintsQuery();
  const { stakedSet, fetching: fetchingCurrentStaked } = getCurrentStakedQuery();

  if (loadingMints || fetchingCurrentStaked)
    return <ComponentStateHandler loading="Loading your NFTs..." />;

  if (mintsError) return <ComponentStateHandler error="Error fetching your NFTs..." />;

  if (!mintsData?.bleuNFTMints?.items.length)
    return <ComponentStateHandler length="You have no NFTs minted yet..." />;

  const items =
    mintsData?.bleuNFTMints?.items.sort((a, b) => b.createdAt - a.createdAt) ||
    ([] as IGetYourMintsResponse[]);

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((nft) => {
        const tokenId = Number(nft.tokenId);
        const isStaked = stakedSet.has(tokenId);

        return (
          <li
            key={nft.id}
            className={cn(
              'border-2 border-primary/20 hover:border-primary/40 p-4 rounded-lg flex flex-col items-start font-mono gap-y-2',
              transition_colors
            )}
          >
            <div
              className={cn(
                'w-full flex items-center justify-center border-b pb-0.5 mb-2',
                theme === 'dark' ? 'border-content' : 'border-black/20'
              )}
            >
              <p className="text-lg">NFT Info</p>
            </div>

            <p className="font-semibold text-base">
              ID: {''}
              <span className="font-normal text-sm text-sub-text">{tokenId}</span>
            </p>

            <p className="font-semibold text-base">
              Created at: {''}
              <span className="font-normal text-sm text-sub-text">
                {formatNftTimestamp(Number(nft.createdAt))}
              </span>
            </p>

            <div className="flex w-full mt-4">
              <TokenActionButton tokenId={tokenId} action={isStaked ? 'unstake' : 'stake'} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default UserNFTs;
