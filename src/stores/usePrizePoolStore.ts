import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PrizePoolState {
  amount: number;
  addAmount: (amount: number) => void;
  resetPool: () => void;
}

export const usePrizePoolStore = create<PrizePoolState>()(
  persist(
    (set) => ({
      amount: 0,
      addAmount: (amount) => set((state) => ({ amount: state.amount + amount })),
      resetPool: () => set({ amount: 0 }),
    }),
    {
      name: 'prize-pool-storage',
    }
  )
);