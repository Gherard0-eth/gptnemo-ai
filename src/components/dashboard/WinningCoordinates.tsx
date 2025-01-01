import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";

export const WinningCoordinates = () => {
  const { treasureLocation } = useTreasureHunt();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Treasure Location</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {treasureLocation ? (
          <div className="space-y-1">
            <div className="text-lg font-semibold">Island {treasureLocation.islandId}</div>
            <div className="text-sm text-muted-foreground">
              Coordinates: ({treasureLocation.coordinates.x}, {treasureLocation.coordinates.y})
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No active treasure location</div>
        )}
      </CardContent>
    </Card>
  );
};