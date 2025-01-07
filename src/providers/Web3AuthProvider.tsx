import { createContext, useContext } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { sepolia } from 'wagmi/chains';

// Get projectId from environment variable
const projectId = import.meta.env.WALLETCONNECT_PROJECT_ID;

// Define metadata
const metadata = {
  name: 'GPTNemo',
  description: 'AI-Powered Treasure Hunt Game',
  url: 'https://gptnemo.com',
  icons: ['https://gptnemo.com/favicon.ico']
};

// Define chains
const chains = [sepolia] as const;

// Create wagmi config only if projectId exists
export const config = projectId ? defaultWagmiConfig({
  chains,
  projectId,
  metadata,
}) : null;

// Create modal only if config exists
if (config) {
  createWeb3Modal({ 
    wagmiConfig: config, 
    projectId, 
    defaultChain: sepolia,
  });
}

interface Web3AuthContextType {
  address: string | undefined;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

export function Web3AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    if (!projectId) {
      console.error('WalletConnect Project ID is not configured. Please check your environment variables.');
      return;
    }

    try {
      const connector = connectors[0];
      if (!connector) {
        throw new Error('No connector available');
      }

      await connectAsync({
        connector,
        chainId: sepolia.id
      });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <Web3AuthContext.Provider value={{ 
      address, 
      isConnected, 
      connect: handleConnect, 
      disconnect 
    }}>
      {children}
    </Web3AuthContext.Provider>
  );
}

export function useWeb3Auth() {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
}