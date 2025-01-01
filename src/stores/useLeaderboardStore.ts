import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LeaderboardEntry {
  username: string;
  finds: number;
  worth: number;
}

interface LeaderboardState {
  entries: LeaderboardEntry[];
  addWin: (username: string, worth: number) => void;
  getTopHunters: () => LeaderboardEntry[];
  resetEntries: () => void;
}

export const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      entries: [
        { username: "Nina", finds: 3, worth: 25.5 },
        { username: "Pinta", finds: 2, worth: 18.3 },
        { username: "Santa Maria", finds: 1, worth: 12.7 }
      ],
      addWin: (username, worth) => {
        const { entries } = get();
        const existingEntry = entries.find(entry => entry.username === username);
        
        if (existingEntry) {
          set({
            entries: entries.map(entry =>
              entry.username === username
                ? { ...entry, finds: entry.finds + 1, worth: entry.worth + worth }
                : entry
            ),
          });
        } else {
          set({
            entries: [...entries, { username, finds: 1, worth }],
          });
        }
      },
      getTopHunters: () => {
        const { entries } = get();
        return [...entries].sort((a, b) => b.worth - a.worth);
      },
      resetEntries: () => {
        set({
          entries: [
            { username: "Nina", finds: 3, worth: 25.5 },
            { username: "Pinta", finds: 2, worth: 18.3 },
            { username: "Santa Maria", finds: 1, worth: 12.7 }
          ]
        });
      },
    }),
    {
      name: 'leaderboard-storage',
    }
  )
);