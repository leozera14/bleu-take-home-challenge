import { BleuNFTAbi } from '@/lib/abis/BleuNFTAbi';
import { BleuNFTStakerAbi } from '@/lib/abis/BleuNFTStakerAbi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePublicClient, useWriteContract } from 'wagmi';

export type TokenAction = 'stake' | 'unstake';
export type ActionStep = 'idle' | 'approving' | 'acting';

export function useTokenAction(tokenId: number, action: TokenAction) {
  const client = usePublicClient();

  const stakerAddress = process.env.NEXT_PUBLIC_STAKER_CONTRACT_ADDRESS as `0x${string}`;
  const nftAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

  const [currentStep, setCurrentStep] = useState<ActionStep>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);

  const { writeContractAsync: approveAsync } = useWriteContract();
  const { writeContractAsync: actionAsync } = useWriteContract();

  const handleAction = async () => {
    try {
      if (action === 'stake') {
        setCurrentStep('approving');

        const approveHash = await approveAsync({
          address: nftAddress,
          abi: BleuNFTAbi,
          functionName: 'approve',
          args: [stakerAddress, BigInt(tokenId)],
        });

        await client?.waitForTransactionReceipt({ hash: approveHash });

        toast.success('Successfully approved!');
      }

      setCurrentStep('acting');

      const actionHash = await actionAsync({
        address: stakerAddress,
        abi: BleuNFTStakerAbi,
        functionName: action,
        args: [BigInt(tokenId)],
      });

      await client?.waitForTransactionReceipt({ hash: actionHash });

      toast.success(`Successfully ${action}d!`);

      setIsDone(true);

      setTimeout(() => {
        setIsDone(false);
        setCurrentStep('idle');
        setErrorMessage('');
      }, 1500);
    } catch (err) {
      let message = 'Unknown error';

      if (err instanceof Error) {
        message = err.message;
      }

      setErrorMessage(
        message.includes('User rejected')
          ? 'User rejected the transaction.'
          : `Error trying to ${action}...`
      );

      toast.error(errorMessage);

      setCurrentStep('idle');
    }
  };

  useEffect(() => {
    setCurrentStep('idle');
    setErrorMessage('');
    setIsDone(false);
  }, []);

  return {
    currentStep,
    isBusy: currentStep !== 'idle' && !isDone,
    isError: !!errorMessage,
    errorMessage,
    isDone,
    handleAction,
  };
}
