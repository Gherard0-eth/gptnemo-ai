import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { createContext, useContext, ReactNode } from 'react';
import { sepolia } from 'wagmi/chains';

// Get projectId from environment variable
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'default_project_id';

// Define metadata
const metadata = {
  name: 'GPTNemo',
  description: 'AI-Powered Treasure Hunt Game',
  url: 'https://gptnemo.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Define chains
const chains = [sepolia] as const;

// Create wagmi config
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// Create modal
createWeb3Modal({ 
  wagmiConfig: config, 
  projectId, 
  defaultChain: sepolia,
});

interface Web3AuthContextType {
  address: string | undefined;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      const connector = connectors[0];
      if (!connector) {
        console.error('No connector available');
        return;
      }
      await connectAsync({ connector });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        address,
        isConnected,
        connect: handleConnect,
        disconnect,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
};