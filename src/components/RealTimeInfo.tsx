import { PrizePoolCard } from "./prize-pool/PrizePoolCard";
import { LeaderboardCard } from "./leaderboard/LeaderboardCard";
import { RecentFindsCard } from "./recent-finds/RecentFindsCard";

export function RealTimeInfo() {
  return (
    <div className="space-y-6">
      <PrizePoolCard />
      <LeaderboardCard />
      <RecentFindsCard />
    </div>
  );
}