import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string | null;
  userAddress: string | null;
  setUsername: (username: string) => void;
  setUserAddress: (address: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: null,
      userAddress: null,
      setUsername: (username) => set({ username }),
      setUserAddress: (address) => set({ userAddress: address }),
      logout: () => set({ username: null, userAddress: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);