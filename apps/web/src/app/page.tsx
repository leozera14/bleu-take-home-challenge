'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import MintModal from '@/components/nfts/modals/mint-nft-modal';
import AllNFTs from '@/components/nfts/tabs-components/all-nfts';
import StakedNFTs from '@/components/nfts/tabs-components/staked-nfts';
import UserNFTs from '@/components/nfts/tabs-components/user-nfts';
import { Button } from '@/components/ui/button';
import { transition_colors } from '@/constant/transition-colors';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';
import { ToastContainer } from 'react-toastify';

type Tab = 'user' | 'all' | 'staked';

export default function Home() {
  const { theme } = useThemeStore();

  const { address } = useAccount();

  const [tab, setTab] = useState<Tab>('all');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const activeTab = address ? tab : 'all';

  const disabledTabs = !address;

  const ComponentToShow = useMemo(() => {
    return {
      user: UserNFTs,
      all: AllNFTs,
      staked: StakedNFTs,
    }[activeTab];
  }, [activeTab]);

  useEffect(() => {
    if (!address) {
      setTab('all');
    }
  }, [address]);

  const tabClass = (tabName: Tab) =>
    tabName === tab
      ? 'border-primary'
      : `${theme === 'dark' ? 'border-content' : 'border-black/20'}`;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <nav className="w-full flex-1 flex flex-wrap justify-center space-x-2 mb-4 md:mb-0">
          <button
            onClick={() => setTab('all')}
            className={cn(
              'cursor-pointer disabled:cursor-not-allowed border-b-2 disabled:opacity-70 pb-0.5 px-8 md:px-12',
              tabClass('all'),
              transition_colors
            )}
            type="button"
          >
            All NFTs
          </button>
          <button
            onClick={() => setTab('user')}
            disabled={disabledTabs}
            className={cn(
              'cursor-pointer disabled:cursor-not-allowed border-b-2 disabled:opacity-70 pb-0.5 px-8 md:px-12',
              tabClass('user'),
              transition_colors
            )}
            type="button"
          >
            Your NFTs
          </button>
          <button
            onClick={() => setTab('staked')}
            disabled={disabledTabs}
            className={cn(
              'cursor-pointer disabled:cursor-not-allowed border-b-2 disabled:opacity-70 pb-0.5 px-8 md:px-12',
              tabClass('staked'),
              transition_colors
            )}
            type="button"
          >
            Staked NFTs
          </button>
        </nav>

        <div className="w-full flex md:w-auto">
          <Button
            variant="default"
            className="w-full md:w-auto disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!address}
            onClick={() => setIsOpenModal(true)}
          >
            Mint NFT
          </Button>
        </div>
      </div>

      <ComponentToShow />

      <MintModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />

      <ToastContainer theme={theme} />
    </div>
  );
}
