import { Award, DollarSign, Sparkles } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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

const getPositionEmoji = (position: number) => {
  switch (position) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
};

export function RealTimeInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-apple-accent" />
            Current Prize Pool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-apple-accent">45.8 ETH</div>
          <p className="text-sm text-muted-foreground">≈ $98,750 USD</p>
        </CardContent>
      </Card>

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
                <div key={hunter.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {hunter.name} <span className="text-muted-foreground">#{index + 1} {getPositionEmoji(index + 1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{hunter.finds} finds</span>
                    <span className="text-apple-accent font-medium">{hunter.worth}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-apple-accent" />
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
                    <div className="text-apple-accent">{find.worth}</div>
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