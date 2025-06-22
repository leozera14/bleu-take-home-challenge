'use client'

import { useEffect, useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Button } from '@/components/ui/button'
import { IMintModalPros } from '@/types/MintModal'
import { BleuNFTAbi } from '@/lib/abis/BleuNFTAbi'
import { cn } from '@/lib/utils'

export default function MintModal({
  isOpen, 
  onClose, 
}: IMintModalPros) {
  const { address } = useAccount()

  const {data: hash, isPending, isError, writeContractAsync} = useWriteContract()

  const [tokenId, setTokenId] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>("")


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) setTokenId(e.target.value)
  }

  const handleMintNFT = async () => {
    try {
      await writeContractAsync({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT! as `0x${string}`,
        abi: BleuNFTAbi,
        functionName: 'mint',
        args: [address!, BigInt(tokenId)], 
      })
    } catch (error: any) {
      if(error?.message?.includes("User rejected the request")) {
        setErrorMessage("User rejected the transaction!")
      }
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  
  useEffect(() => {
    if(isConfirmed) {
      setTokenId("")
      setErrorMessage("")
      onClose()
    }
  },[isConfirmed])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-sm rounded-xl bg-content p-6">
        <button
          className="absolute top-3 right-3 text-sub-text hover:text-error cursor-pointer"
          onClick={onClose}
        >
          x
        </button>

        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Mint a new BleuNFT
        </h2>

        <label className="block mb-1 text-sm text-foreground">Token ID</label>
        <input
          type="text"
          placeholder="42"
          className={cn(
            "w-full rounded border px-3 py-2 bg-background text-foreground outline-none border-transparent",
            errorMessage ? "mb-2" : "mb-4"
          )}
          value={tokenId}
          onChange={onChange}
        />


        {isError && errorMessage && (
          <p className="text-error text-sm mb-4">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            disabled={!tokenId || isPending || isConfirming}
            onClick={() => handleMintNFT?.()}
          >
            {isPending || isConfirming
              ? 'Minting…'
              : isConfirmed
                ? 'Minted ✓'
                : 'Confirm'}
          </Button>
        </div>

      </div>
    </div>
  )
}
