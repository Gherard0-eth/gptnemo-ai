import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeaderboardEntry } from "./LeaderboardEntry";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";

export const LeaderboardCard = () => {
  const getTopHunters = useLeaderboardStore((state) => state.getTopHunters);
  const leaderboard = getTopHunters();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-apple-accent" />
          Top Treasure Hunters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[180px] pr-4">
          <div className="space-y-6">
            {leaderboard.map((hunter, index) => (
              <LeaderboardEntry
                key={hunter.username}
                hunter={{
                  id: index,
                  name: hunter.username,
                  finds: hunter.finds,
                  worth: `${hunter.worth.toFixed(1)} ETH`
                }}
                position={index + 1}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};