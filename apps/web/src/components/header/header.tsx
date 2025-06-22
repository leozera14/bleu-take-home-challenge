'use client';

import { useThemeStore } from '@/store/useThemeStore';
import { Moon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ConnectWalletButton } from './connect-wallet-button';
import { Button } from '../ui/button';

const Header = () => {
  const { toggleTheme } = useThemeStore();

  return (
    <header className="w-full flex relative h-16 items-center justify-between bg-content px-5 rounded-3xl">
      <Link href="/">
        <h1 className="text-primary font-bold text-lg font-roboto-mono text-center">Bleu</h1>
      </Link>
      
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
