import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { mainnet, sepolia } from 'wagmi/chains';

const config = createConfig(
  getDefaultConfig({
    appName: "Epirates",
    // You can get this from WalletConnect Cloud
    walletConnectProjectId: "YOUR_PROJECT_ID",
    chains: [mainnet, sepolia],
  })
);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export { ConnectKitButton };