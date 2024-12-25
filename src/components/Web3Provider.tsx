import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'Epirates',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
  chains: [mainnet, sepolia],
  ssr: false, // Required for Vite
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}