'use client';

import { graphqlClient } from '@/lib/graphql';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import type { ReactNode } from 'react';
import { Provider } from 'urql';
import { http, WagmiProvider, createConfig } from 'wagmi';
import {  sepolia } from 'wagmi/chains';

const walletConnectProjectId = '';

const config = createConfig(
  getDefaultConfig({
    chains: [
      sepolia,
    ],
    transports: {

      [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? ''),
    },
    // Required API Keys
    walletConnectProjectId,
    // Required App Info
    appName: 'Next Bleu Starter',
    // Optional App Info
    appDescription: 'Template for web3 next projects',
    appUrl: 'http://localhost:3000',
    appIcon: 'https://cdn-icons-png.flaticon.com/128/4064/4064205.png',
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <Provider value={graphqlClient}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </QueryClientProvider>
      </Provider>
    </WagmiProvider>
  );
};
