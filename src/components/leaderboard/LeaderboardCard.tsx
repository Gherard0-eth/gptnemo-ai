import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeaderboardEntry } from "./LeaderboardEntry";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useEffect, useState } from "react";

export const LeaderboardCard = () => {
  const [topHunters, setTopHunters] = useState([] as ReturnType<typeof useLeaderboardStore.getState>['entries']);
  const getTopHunters = useLeaderboardStore((state) => state.getTopHunters);
  
  useEffect(() => {
    setTopHunters(getTopHunters());
  }, [getTopHunters]);

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
            {topHunters.map((hunter, index) => (
              <LeaderboardEntry
                key={hunter.id}
                hunter={hunter}
                position={index + 1}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};