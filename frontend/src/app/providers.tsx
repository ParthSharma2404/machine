'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'YieldPulse Institutional',
  projectId: 'fce3a600eeb146238662bc9a32663123', // Demo projectId for RainbowKit
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false, // Disabled SSR to fix Next.js static export hydration mismatches
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  // To avoid hydration mismatch errors on the client when ssr is false, we only render children when mounted
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({
          accentColor: '#1E3A8A', // Deep Navy Blue
          accentColorForeground: '#FFFFFF',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}>
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
