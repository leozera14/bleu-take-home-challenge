'use client';

import { Button } from '@/components/ui/button';
import { BleuNFTAbi } from '@/lib/abis/BleuNFTAbi';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, usePublicClient, useWriteContract } from 'wagmi';

interface IMintModalPros {
  isOpen: boolean;
  onClose: () => void;
}

export default function MintModal({ isOpen, onClose }: IMintModalPros) {
  const { address } = useAccount();

  const client = usePublicClient();

  const { isPending, writeContractAsync } = useWriteContract();

  const [tokenId, setTokenId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const mintContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) setTokenId(e.target.value);
  };

  const handleMintNFT = async () => {
    try {
      setIsLoading(true);

      const mintHash = await writeContractAsync({
        address: mintContractAddress,
        abi: BleuNFTAbi,
        functionName: 'mint',
        args: [address as `0x${string}`, BigInt(tokenId)],
      });

      await client?.waitForTransactionReceipt({ hash: mintHash });

      setIsDone(true);

      toast.success('NFT successfully minted!');

      setTokenId('');

      onClose();
    } catch (err) {
      let message = 'Unknown error';

      if (err instanceof Error) {
        message = err.message;
      }

      if (message.includes('User rejected the request')) {
        toast.error('User rejected the transaction!');
      } else {
        toast.error('Error trying to Mint NFT...');
      }
    } finally {
      setIsDone(false);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form className="relative w-full max-w-sm rounded-xl bg-content p-6">
        <button
          className="absolute top-3 right-3 text-sub-text hover:text-error cursor-pointer"
          onClick={onClose}
          type="button"
        >
          x
        </button>

        <h2 className="mb-4 text-lg font-semibold text-foreground">Mint a new BleuNFT</h2>

        <label className="block mb-1 text-sm text-foreground" htmlFor="tokenId">
          Token ID
        </label>
        <input
          type="text"
          placeholder="42"
          className={cn(
            'w-full rounded border px-3 py-2 bg-background text-foreground outline-none'
          )}
          value={tokenId}
          onChange={onChange}
          name="tokenId"
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            disabled={!tokenId || isPending || isLoading}
            onClick={() => handleMintNFT?.()}
          >
            {isPending || isLoading ? 'Minting…' : isDone ? 'Minted ✓' : 'Confirm'}
          </Button>
        </div>
      </form>
    </div>
  );
}
