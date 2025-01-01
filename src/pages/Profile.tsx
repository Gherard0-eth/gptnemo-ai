import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shovel, Award, User } from "lucide-react";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { useUserStore } from "@/stores/useUserStore";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { TreasureFoundDialog } from "@/components/treasure/TreasureFoundDialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const username = useUserStore((state) => state.username);
  const shovels = useShovelStore((state) => state.shovels);
  const getTopHunters = useLeaderboardStore((state) => state.getTopHunters);
  const prizePool = usePrizePoolStore((state) => state.amount);
  const [showTreasureDialog, setShowTreasureDialog] = useState(false);
  const [selectedTreasureId, setSelectedTreasureId] = useState<number | null>(null);

  const userTreasures = getTopHunters()
    .filter(hunter => hunter.username === username)
    .map(treasure => ({
      ...treasure,
      redeemed: false // This should come from your database in a real implementation
    }));

  const handleRedeem = (treasureId: number) => {
    setSelectedTreasureId(treasureId);
    setShowTreasureDialog(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-apple-accent" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <span className="font-medium">{username || 'Anonymous Pirate'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shovel className="h-4 w-4 text-apple-gray-500" />
            <span>{shovels} shovels available</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-apple-accent" />
            Treasure History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {userTreasures.length > 0 ? (
              <div className="space-y-4">
                {userTreasures.map((treasure, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div>
                      <p className="font-medium">{treasure.worth.toFixed(1)} ETH</p>
                      <p className="text-sm text-muted-foreground">Found on Island #{index + 1}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {treasure.redeemed ? 'Redeemed' : 'Redeem'}
                      </span>
                      <Switch
                        checked={treasure.redeemed}
                        onCheckedChange={() => !treasure.redeemed && handleRedeem(index)}
                        className={`${
                          treasure.redeemed
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={treasure.redeemed}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No treasures found yet. Keep exploring!
              </p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <TreasureFoundDialog
        isOpen={showTreasureDialog}
        onOpenChange={setShowTreasureDialog}
        onRedeem={() => {
          // Here you would update the redeemed status in your database
          setShowTreasureDialog(false);
        }}
      />
    </div>
  );
}