import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecentFindEntry } from "./RecentFindEntry";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useEffect, useState } from "react";

interface Find {
  id: number;
  finder: string;
  island: string;
  worth: string;
  time: string;
  timestamp: Date;
  redeemed: boolean;
}

export const RecentFindsCard = () => {
  const getTopHunters = useLeaderboardStore((state) => state.getTopHunters);
  const [recentFinds, setRecentFinds] = useState<Find[]>([]);

  useEffect(() => {
    // Transform the hunters data into finds
    const hunters = getTopHunters();
    const finds = hunters.map((hunter, index) => ({
      id: index + 1,
      finder: hunter.username,
      island: `Island #${Math.floor(Math.random() * 3) + 1}`,
      worth: `${hunter.worth.toFixed(1)} ETH`,
      time: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      timestamp: new Date(),
      redeemed: false
    }));
    
    // Sort by most recent first
    const sortedFinds = finds.sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
    
    setRecentFinds(sortedFinds);
  }, [getTopHunters]); // Update whenever the hunters list changes

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-apple-accent" />
          Recent Finds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[160px] pr-4">
          <div className="space-y-4">
            {recentFinds.length > 0 ? (
              recentFinds.map((find) => (
                <RecentFindEntry key={find.id} find={find} />
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                No treasure finds yet
              </p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};