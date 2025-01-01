import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DashboardState {
  totalInflow: number;
  founderzInflow: number;
  islandInflows: { [key: string]: number };
  addInflow: (amount: number, islandId?: string) => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      totalInflow: 0,
      founderzInflow: 0,
      islandInflows: {},
      addInflow: (amount, islandId) => set((state) => ({
        totalInflow: state.totalInflow + amount,
        founderzInflow: state.founderzInflow + (amount * 0.1), // 10% to founderz
        islandInflows: islandId 
          ? {
              ...state.islandInflows,
              [islandId]: (state.islandInflows[islandId] || 0) + (amount * 0.05) // 5% to island
            }
          : state.islandInflows
      })),
      reset: () => set({
        totalInflow: 0,
        founderzInflow: 0,
        islandInflows: {}
      })
    }),
    {
      name: 'dashboard-storage'
    }
  )
);