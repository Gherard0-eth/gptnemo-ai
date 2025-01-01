import { IslandGame } from "@/components/game/IslandGame";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function IslandMap() {
  const { toast } = useToast();
  const [gameKey, setGameKey] = useState(0);

  const handleTreasureFound = () => {
    toast({
      title: "🎉 Treasure Found!",
      description: "Congratulations! You've discovered the hidden treasure!",
    });
  };

  const handleNewGame = () => {
    setGameKey(prev => prev + 1);
    toast({
      title: "New Game Started",
      description: "A new treasure has been hidden somewhere on the map...",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Treasure Hunt</h1>
          <button 
            onClick={handleNewGame}
            className="apple-button"
          >
            New Game
          </button>
        </div>
        
        <p className="apple-text">
          Search for the hidden treasure by digging tiles. The treasure could be anywhere on the map!
        </p>

        <div className="apple-container p-4">
          <IslandGame 
            key={gameKey}
            onTreasureFound={handleTreasureFound}
          />
        </div>
      </div>
    </div>
  );
}