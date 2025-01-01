import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShovelStore {
  shovels: number;
  addShovels: (amount: number) => void;
  useShovel: () => boolean;
}

export const useShovelStore = create<ShovelStore>()(
  persist(
    (set, get) => ({
      shovels: 0,
      addShovels: (amount) => set((state) => ({ shovels: state.shovels + amount })),
      useShovel: () => {
        const { shovels } = get();
        if (shovels > 0) {
          set({ shovels: shovels - 1 });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'shovel-storage',
    }
  )
);