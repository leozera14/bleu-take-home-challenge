"use client"
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import UserNFTs from "@/components/nfts/user-nfts";
import AllNFTs from "@/components/nfts/all-nfts";
import StakedNFTs from "@/components/nfts/staked-nfts";
import { cn } from "@/lib/utils";
import { transition_colors } from "@/constant/transition-colors";
import MintModal from "@/components/nfts/mint-nft-modal";

export default function Home() {
  const {address} = useAccount()
  
  const [tab, setTab] = useState<'user' | 'all' | 'staked'>("all")
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const activeTab = address ? tab : "all"

  const disabledTabs = !address

  const ComponentToShow = useMemo(() => {
    return {
      user: UserNFTs,
      all: AllNFTs,
      staked: StakedNFTs,
    }[activeTab]
  }, [activeTab])

  useEffect(() => {
    if (!address) {
      setTab('all');
    }
  }, [address]);

  return (
   <div className="flex flex-col gap-y-6">
      <div className="flex items-center">
        <nav className="flex-1 flex justify-center space-x-2">
          <button
            onClick={() => setTab('all')}
            className={cn("cursor-pointer disabled:cursor-not-allowed border-b-2 disabled:opacity-70 pb-0.5 px-20", 
              tab === "all" ? "border-primary" : "border-gray-800",
              transition_colors)}
          >
            All NFTs
          </button>
          <button
            onClick={() => setTab('user')}
            disabled={disabledTabs}
            className={cn("cursor-pointer disabled:cursor-not-allowed border-b  disabled:opacity-70 pb-0.5 px-12", 
              tab === "user" ? "border-primary" : "border-gray-800",
              transition_colors)}
          >
            Your NFTs
          </button>
          <button
            onClick={() => setTab('staked')}
            disabled={disabledTabs}
            className={cn("cursor-pointer disabled:cursor-not-allowed border-b disabled:opacity-70 pb-0.5 px-12", 
              tab === "staked" ? "border-primary" : "border-gray-800",
              transition_colors)}
            type="button"
          >
            Staked NFTs
          </button>
        </nav>

        <Button 
          variant="default" 
          className="disabled:cursor-not-allowed disabled:opacity-70" 
          disabled={!address} 
          onClick={() => setIsOpenModal(true)}
        >
          Mint NFT
        </Button>
      </div>

      <ComponentToShow />

      <MintModal 
        isOpen={isOpenModal} 
        onClose={() => {
          setIsOpenModal(false)
        }} 
      />
    </div>
  );
}
