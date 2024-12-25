import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeaderboardEntry } from "./LeaderboardEntry";

const mockLeaderboard = [
  { id: 1, name: "Captain Blackbeard", finds: 23, worth: "12.5 ETH" },
  { id: 2, name: "Silver Morgan", finds: 19, worth: "10.2 ETH" },
  { id: 3, name: "Red Grace", finds: 15, worth: "8.7 ETH" },
];

export const LeaderboardCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-apple-accent" />
          Top Treasure Hunters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {mockLeaderboard.map((hunter, index) => (
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