import { Award, DollarSign, Sparkles } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Mock data - would be replaced with real data from API
const mockLeaderboard = [
  { id: 1, name: "Captain Blackbeard", finds: 23, worth: "12.5 ETH" },
  { id: 2, name: "Silver Morgan", finds: 19, worth: "10.2 ETH" },
  { id: 3, name: "Red Grace", finds: 15, worth: "8.7 ETH" },
];

const mockRecentFinds = [
  { id: 1, finder: "Jack Sparrow", island: "Skull's Haven", worth: "2.3 ETH", time: "2h ago" },
  { id: 2, finder: "Anne Bonny", island: "Dragon's Lair", worth: "1.8 ETH", time: "3h ago" },
  { id: 3, finder: "Mary Read", island: "Mermaid's Cove", worth: "1.5 ETH", time: "5h ago" },
];

export function RealTimeInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-pirate text-pirate-navy">
            <DollarSign className="h-5 w-5 text-pirate-gold" />
            Current Prize Pool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-pirate-gold">45.8 ETH</div>
          <p className="text-sm text-muted-foreground">≈ $98,750 USD</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-pirate text-pirate-navy">
            <Award className="h-5 w-5 text-pirate-gold" />
            Top Treasure Hunters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-4">
              {mockLeaderboard.map((hunter) => (
                <div key={hunter.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{hunter.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {hunter.finds} finds
                    </div>
                  </div>
                  <div className="text-pirate-gold font-medium">{hunter.worth}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-pirate text-pirate-navy">
            <Sparkles className="h-5 w-5 text-pirate-gold" />
            Recent Finds
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-4">
              {mockRecentFinds.map((find) => (
                <div key={find.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{find.finder}</div>
                    <div className="text-sm text-muted-foreground">{find.time}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">{find.island}</div>
                    <div className="text-pirate-gold">{find.worth}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}