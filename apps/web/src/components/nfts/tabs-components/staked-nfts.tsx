'use client';

import type React from 'react';

import { transition_colors } from '@/constant/transition-colors';
import { getCurrentStakedQuery } from '@/hooks/index';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';
import type { ICurrentStakeRecord } from '@/types/ICurrentStake';
import { ComponentStateHandler } from '@/utils/component-state-handler';
import { formatNftTimestamp } from '@/utils/format-nft-timestamp';
import { TokenActionButton } from '../buttons/token-action-button';

const StakedNFTs: React.FC = () => {
  const { theme } = useThemeStore();
  const { data, fetching, error } = getCurrentStakedQuery();

  if (fetching) return <ComponentStateHandler loading="Loading your Staked NFTs..." />;
  if (error) return <ComponentStateHandler error="Error fetching your Staked NFTs..." />;

  const items =
    data?.bleuNFTCurrentStakes.items.sort((a, b) => b.createdAt - a.createdAt) ||
    ([] as ICurrentStakeRecord[]);

  if (items.length === 0) return <ComponentStateHandler length="You have no Staked NFTs..." />;

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((nft) => (
        <li
          key={nft.tokenId}
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
            <span className="font-normal text-sm text-sub-text">{nft.tokenId}</span>
          </p>

          <p className="font-semibold text-base">
            Created at: {''}
            <span className="font-normal text-sm text-sub-text">
              {formatNftTimestamp(Number(nft.createdAt))}
            </span>
          </p>

          <div className="flex w-full mt-4">
            <TokenActionButton tokenId={Number(nft.tokenId)} action="unstake" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default StakedNFTs;
