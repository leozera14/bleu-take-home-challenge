'use client';

import { transition_colors } from '@/constant/transition-colors';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/useThemeStore';
import { Moon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { ConnectWalletButton } from './connect-wallet-button';

const Header = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <header className="w-full flex relative h-16 items-center justify-between bg-content px-5 rounded-3xl">
      <Link href="/">
        <h1 className="text-primary font-bold text-lg font-roboto-mono text-center">Bleu</h1>
      </Link>

      <div className="flex items-center gap-x-6">
        <Link href="/">
          <h1
            className={cn(
              'text-primary font-bold text-lg font-roboto-mono text-center hover:text-primary/80 hover:underline',
              transition_colors
            )}
          >
            NFTs
          </h1>
        </Link>

        <Link href="/transactions">
          <h1
            className={cn(
              'text-primary font-bold text-lg font-roboto-mono text-center hover:text-primary/80 hover:underline',
              transition_colors
            )}
          >
            Transactions
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <ConnectWalletButton />
        <Button
          variant="ghost"
          className="flex items-center justify-center rounded-full bg-primary/10 p-1 w-8 h-8 "
          onClick={() => toggleTheme()}
        >
          <Moon size={18} className="text-primary" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
