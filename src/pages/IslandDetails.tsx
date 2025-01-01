import { useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { MapGrid } from "@/components/map/MapGrid";
import { DigDialog } from "@/components/map/DigDialog";
import { IslandStats } from "@/components/island/IslandStats";
import { IslandCharacteristics } from "@/components/island/IslandCharacteristics";
import { IslandHeader } from "@/components/island/IslandHeader";
import { islandData } from "@/data/islandData";
import { TreasureFoundDialog } from "@/components/treasure/TreasureFoundDialog";
import { FloatingRedeemButton } from "@/components/treasure/FloatingRedeemButton";

export default function IslandDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const { data: treasureLocation, isLoading, error } = useTreasureHunt();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [dugTiles, setDugTiles] = useState<Set<string>>(new Set());
  const [showTreasureDialog, setShowTreasureDialog] = useState(false);
  const [hasUnredeemedTreasure, setHasUnredeemedTreasure] = useState(false);
  
  const island = islandData[id as keyof typeof islandData];
  const currentPrizePool = 45.8; // This should be fetched from your actual prize pool state

  if (!island) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Island Not Found</h1>
          <p className="text-gray-600">The island you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleSquareClick = (row: number, col: number) => {
    setSelectedSquare(`${row}-${col}`);
  };

  const handleDig = (tileId: string) => {
    setDugTiles(new Set([...dugTiles, tileId]));
    setSelectedSquare(null);

    const [row, col] = tileId.split('-').map(Number);

    if (treasureLocation && 
        treasureLocation.islandId === id && 
        row === treasureLocation.coordinates.y && 
        col === treasureLocation.coordinates.x) {
      setShowTreasureDialog(true);
    } else {
      toast({
        title: "Keep searching! ⛵",
        description: "The treasure is not here. Try another location!",
        duration: 3000,
      });
    }
  };

  const handleRedeem = () => {
    // Implement your redemption logic here
    console.log("Redeeming treasure...");
    setShowTreasureDialog(false);
    setHasUnredeemedTreasure(false);
    toast({
      title: "Prize Redeemed! 🎉",
      description: "Your treasure has been successfully claimed!",
      duration: 5000,
    });
  };

  const handleTreasureDialogClose = (open: boolean) => {
    setShowTreasureDialog(open);
    if (!open) {
      setHasUnredeemedTreasure(true);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 p-4">
      <div className="space-y-6 apple-container p-6">
        <IslandHeader name={island.name} description={island.description} />
        
        <IslandCharacteristics characteristics={island.characteristics} />
        
        <IslandStats
          climate={island.climate}
          terrain={island.terrain}
          dangerLevel={island.dangerLevel}
        />

        <div className="mt-8">
          <h2 className="text-2xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-4">
            Explore the Island
          </h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden relative">
            <img 
              src="/lovable-uploads/b8de5ac2-3913-4942-bbc3-5b76abaa913d.png"
              alt="Island visualization"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <MapGrid
                onSquareClick={handleSquareClick}
                clusterId={parseInt(id || "0", 10) - 1}
                dugTiles={dugTiles}
              />
            </div>
          </div>
        </div>

        {/* Debug Information */}
        {!isLoading && !error && treasureLocation && (
          <div className="mt-8 p-4 bg-black/10 rounded-lg">
            <h2 className="text-xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
              Debug Information
            </h2>
            <p className="text-apple-gray-500 dark:text-apple-gray-300">
              Treasure Location: Island {treasureLocation.islandId} at coordinates ({treasureLocation.coordinates.x}, {treasureLocation.coordinates.y})
            </p>
          </div>
        )}

        <DigDialog
          selectedSquare={selectedSquare}
          onOpenChange={(open) => !open && setSelectedSquare(null)}
          onDig={handleDig}
        />

        <TreasureFoundDialog
          isOpen={showTreasureDialog}
          onOpenChange={handleTreasureDialogClose}
          prizeAmount={currentPrizePool}
          onRedeem={handleRedeem}
        />

        {hasUnredeemedTreasure && (
          <FloatingRedeemButton onClick={() => setShowTreasureDialog(true)} />
        )}
      </div>
    </div>
  );
}