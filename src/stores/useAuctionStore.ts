import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';

interface Bid {
  username: string;
  amount: number;
  timestamp: Date;
}

interface AuctionState {
  currentPrice: number;
  endTime: Date;
  bids: Bid[];
  highestBidder: string | null;
  isActive: boolean;
  placeBid: (username: string, amount: number) => void;
  startNewAuction: () => void;
  resetAuction: () => void;
  extendTime: () => void;
}

export const useAuctionStore = create<AuctionState>()(
  persist(
    (set, get) => ({
      currentPrice: 0.1,
      endTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      bids: [],
      highestBidder: null,
      isActive: true,
      placeBid: (username: string, amount: number) => {
        const { currentPrice, bids, endTime } = get();
        if (amount > currentPrice) {
          // Check if we need to extend time (less than 1 minute remaining)
          const timeLeft = new Date(endTime).getTime() - Date.now();
          if (timeLeft <= 60000) { // less than 1 minute
            const newEndTime = new Date(new Date(endTime).getTime() + 30000); // add 30 seconds
            set({ endTime: newEndTime });
          }

          set({
            currentPrice: amount,
            highestBidder: username,
            bids: [...bids, { 
              username, 
              amount: parseFloat(ethers.formatEther(amount.toString())), 
              timestamp: new Date() 
            }],
          });
        }
      },
      startNewAuction: () => {
        set({
          currentPrice: 0.1,
          endTime: new Date(Date.now() + 10 * 60 * 1000),
          bids: [],
          highestBidder: null,
          isActive: true,
        });
      },
      resetAuction: () => {
        set({
          currentPrice: 0.1,
          endTime: new Date(Date.now() + 10 * 60 * 1000),
          bids: [],
          highestBidder: null,
          isActive: true,
        });
      },
      extendTime: () => {
        const { endTime } = get();
        set({
          endTime: new Date(new Date(endTime).getTime() + 30000)
        });
      },
    }),
    {
      name: 'auction-storage',
    }
  )
);