import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeaderboardEntry } from "./LeaderboardEntry";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useEffect, useState } from "react";

interface Hunter {
  username: string;
  finds: number;
  worth: number;
}

export const LeaderboardCard = () => {
  const getTopHunters = useLeaderboardStore((state) => state.getTopHunters);
  const [leaderboard, setLeaderboard] = useState<Hunter[]>([]);

  useEffect(() => {
    const hunters = getTopHunters();
    const sortedHunters = [...hunters].sort((a, b) => b.worth - a.worth);
    setLeaderboard(sortedHunters);
  }, [getTopHunters]);

  return (
    <Card className="bg-neutral-800/90 dark:bg-neutral-800/90 light:bg-neutral-100/90">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-apple-accent" />
          Top Treasure Hunters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[180px] pr-4">
          <div className="space-y-6">
            {leaderboard.length > 0 ? (
              leaderboard.map((hunter, index) => (
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
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                No hunters on the leaderboard yet
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
