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
import { CollapsibleText } from "@/components/ui/collapsible-text";

export default function IslandDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const { treasureLocation, generateNewTreasure } = useTreasureHunt();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [dugTiles, setDugTiles] = useState<Set<string>>(new Set());
  const [showTreasureDialog, setShowTreasureDialog] = useState(false);
  const [hasUnredeemedTreasure, setHasUnredeemedTreasure] = useState(false);
  const [treasureFound, setTreasureFound] = useState<string | null>(null);
  
  const island = islandData[id as keyof typeof islandData];

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
      setTreasureFound(tileId);
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
    if (id) {
      generateNewTreasure(id);
    }
    setShowTreasureDialog(false);
    setHasUnredeemedTreasure(false);
    toast({
      title: "Prize Redeemed! 🎉",
      description: "Your treasure has been successfully claimed!",
      duration: 5000,
    });
    window.location.reload();
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
        
        <CollapsibleText text={island.description} maxLength={150} />
        
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
                treasureFound={treasureFound}
              />
            </div>
          </div>
        </div>

        <DigDialog
          selectedSquare={selectedSquare}
          onOpenChange={(open) => !open && setSelectedSquare(null)}
          onDig={handleDig}
        />

        <TreasureFoundDialog
          isOpen={showTreasureDialog}
          onOpenChange={handleTreasureDialogClose}
          onRedeem={handleRedeem}
          islandId={id}
        />

        {hasUnredeemedTreasure && (
          <FloatingRedeemButton onClick={() => setShowTreasureDialog(true)} />
        )}
      </div>
    </div>
  );
}