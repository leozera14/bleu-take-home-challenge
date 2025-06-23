'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useTokenAction, TokenAction } from '@/hooks/useTokenAction'
import { handleDynamicLabel } from '@/utils/handleDynamicLabel'

interface TokenActionButtonProps {
  tokenId: number
  action: TokenAction
}

export function TokenActionButton({
  tokenId,
  action,
}: TokenActionButtonProps) {
  const {
    currentStep,
    isBusy,
    isError,
    errorMessage,
    isDone,
    handleAction,
  } = useTokenAction(tokenId, action)

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        onClick={handleAction}
        disabled={isBusy || isDone}
      >
        {handleDynamicLabel({
          isBusy,
          action,
          currentStep,
          isDone
        })}
      </Button>
      
      {isError && (
        <p className="text-error text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  )
}
