import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LeaderboardEntry {
  id: number;
  name: string;
  finds: number;
  worth: string;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  addWin: (username: string, worth: string) => void;
  getTopHunters: () => LeaderboardEntry[];
}

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      entries: [],
      addWin: (username: string, worth: string) => {
        set((state) => {
          const existingEntry = state.entries.find(entry => entry.name === username);
          if (existingEntry) {
            return {
              entries: state.entries.map(entry =>
                entry.name === username
                  ? { ...entry, finds: entry.finds + 1, worth: worth }
                  : entry
              ),
            };
          }
          return {
            entries: [
              ...state.entries,
              {
                id: state.entries.length + 1,
                name: username,
                finds: 1,
                worth: worth,
              },
            ],
          };
        });
      },
      getTopHunters: () => {
        return get().entries.sort((a, b) => b.finds - a.finds).slice(0, 10);
      },
    }),
    {
      name: 'leaderboard-storage',
    }
  )
);