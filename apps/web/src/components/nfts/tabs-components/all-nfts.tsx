'use client';
import type React from 'react';

import { transition_colors } from '@/constant/transition-colors';
import { getAllMintsQuery } from '@/hooks/getAllMintsQuery';
import { getCurrentStakedQuery } from '@/hooks/getCurrentStakedQuery';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';
import type { IGetMintsResponse } from '@/types/IMintRecord';
import { ComponentStateHandler } from '@/utils/component-state-handler';
import { CopyAddressComponent } from '@/utils/copy-to-clipboard';
import { formatNftTimestamp } from '@/utils/format-nft-timestamp';
import { useAccount } from 'wagmi';
import { TokenActionButton } from '../buttons/token-action-button';

const AllNfts: React.FC = () => {
  const { address } = useAccount();
  const { theme } = useThemeStore();

  const { data, fetching, error } = getAllMintsQuery();
  const { stakedSet, fetching: fetchingCurrentStaked } = getCurrentStakedQuery();

  if (fetching || fetchingCurrentStaked) return <ComponentStateHandler loading="Loading NFTs..." />;

  if (error) return <ComponentStateHandler error="Error fetching NFTs..." />;

  if (!data?.bleuNFTMints?.items.length) {
    return <ComponentStateHandler length="No NFTs minted yet..." />;
  }

  const items =
    data.bleuNFTMints.items.sort((a, b) => b.createdAt - a.createdAt) ||
    ([] as IGetMintsResponse[]);

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((nft) => {
        const tokenId = Number(nft.tokenId);
        const owned = address?.toLowerCase() === nft.to.toLowerCase();
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

            <div className="flex items-center gap-x-2">
              <p className="font-semibold text-base" title={nft.to}>
                Owner: {''}
                <span className="font-normal text-sm text-sub-text">
                  {nft.to.slice(0, 6)}…{nft.to.slice(-4)}
                </span>
              </p>

              <CopyAddressComponent address={nft.to} />
            </div>

            <p className="font-semibold text-base">
              Created at: {''}
              <span className="font-normal text-sm text-sub-text">
                {formatNftTimestamp(Number(nft.createdAt))}
              </span>
            </p>

            {address && owned && (
              <div className="flex w-full mt-4">
                <TokenActionButton tokenId={tokenId} action={isStaked ? 'unstake' : 'stake'} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default AllNfts;
