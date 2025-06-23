'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useTokenAction, TokenAction } from '@/hooks/useTokenAction'
import { handleDynamicLabel } from '@/utils/handle-dynamic-label'

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
    <div className='w-full'>
      <Button
        size="sm"
        variant="default"
        onClick={handleAction}
        disabled={isBusy || isDone}
        className='w-full'
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
