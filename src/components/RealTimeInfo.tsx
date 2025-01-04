import { PrizePoolCard } from "./prize-pool/PrizePoolCard";
import { LeaderboardCard } from "./leaderboard/LeaderboardCard";
import { RecentFindsCard } from "./recent-finds/RecentFindsCard";
import { AuctionStatus } from "./auction/AuctionStatus";

export function RealTimeInfo() {
  return (
    <div className="space-y-6">
      <PrizePoolCard />
      <AuctionStatus />
      <LeaderboardCard />
      <RecentFindsCard />
    </div>
  );
}