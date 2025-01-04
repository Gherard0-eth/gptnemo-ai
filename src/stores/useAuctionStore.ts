import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ethers } from 'ethers';
import { usePrizePoolStore } from './usePrizePoolStore';

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
      endTime: new Date(Date.now() + 2 * 60 * 1000),
      bids: [],
      highestBidder: null,
      isActive: true,
      placeBid: (username: string, amount: number) => {
        const { currentPrice, bids, endTime } = get();
        if (amount > currentPrice) {
          const timeLeft = new Date(endTime).getTime() - Date.now();
          if (timeLeft <= 60000) {
            const newEndTime = new Date(new Date(endTime).getTime() + 30000);
            set({ endTime: newEndTime });
          }

          // Convert the amount to a proper decimal string for storage
          const formattedAmount = parseFloat(amount.toString());
          
          set({
            currentPrice: formattedAmount,
            highestBidder: username,
            bids: [...bids, { 
              username, 
              amount: formattedAmount,
              timestamp: new Date() 
            }],
          });
        }
      },
      startNewAuction: () => {
        const { currentPrice, highestBidder } = get();
        if (highestBidder) {
          // Add the winning bid to the Treasury Pool
          usePrizePoolStore.getState().addAmount(currentPrice);
        }
        set({
          currentPrice: 0.1,
          endTime: new Date(Date.now() + 2 * 60 * 1000),
          bids: [],
          highestBidder: null,
          isActive: true,
        });
      },
      resetAuction: () => {
        set({
          currentPrice: 0.1,
          endTime: new Date(Date.now() + 2 * 60 * 1000),
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