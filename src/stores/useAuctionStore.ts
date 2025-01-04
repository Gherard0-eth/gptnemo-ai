import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        const { currentPrice, bids } = get();
        if (amount > currentPrice) {
          set({
            currentPrice: amount,
            highestBidder: username,
            bids: [...bids, { username, amount, timestamp: new Date() }],
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
    }),
    {
      name: 'auction-storage',
    }
  )
);