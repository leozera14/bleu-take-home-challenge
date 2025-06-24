import type { ActionStep, TokenAction } from '@/hooks/useTokenAction';

interface IHandleDynamicLabelProps {
  isBusy: boolean;
  action: TokenAction;
  currentStep: ActionStep;
  isDone: boolean;
}

export const handleDynamicLabel = ({
  isBusy,
  action,
  currentStep,
  isDone,
}: IHandleDynamicLabelProps) =>
  isBusy
    ? action === 'stake'
      ? currentStep === 'approving'
        ? 'Approving…'
        : 'Staking…'
      : 'Unstaking…'
    : isDone
      ? action === 'stake'
        ? 'Staked ✓'
        : 'Unstaked ✓'
      : action === 'stake'
        ? 'Stake'
        : 'Unstake';
