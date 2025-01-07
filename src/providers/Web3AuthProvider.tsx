import { createContext, useContext } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { sepolia } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const metadata = {
  name: 'GPTNemo',
  description: 'AI-Powered Treasure Hunt Game',
  url: 'https://gptnemo.com',
  icons: ['https://gptnemo.com/favicon.ico']
};

const chains = [sepolia];
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({ wagmiConfig: config, projectId, chains });

interface Web3AuthContextType {
  address: string | undefined;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const Web3AuthContext = createContext<Web3AuthContextType | undefined>(undefined);

export function Web3AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await connectAsync();
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