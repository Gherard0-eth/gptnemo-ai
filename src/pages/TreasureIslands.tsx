import { useState } from "react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { IslandCard } from "@/components/IslandCard";
import { islandData, generateNewIsland, type Island } from "@/data/islandData";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TreasureIslands = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { treasureLocation } = useTreasureHunt();
  const { toast } = useToast();
  const [islands, setIslands] = useState<Record<string, Island>>(() => {
    const savedIslands = localStorage.getItem('treasureIslands');
    return savedIslands ? JSON.parse(savedIslands) : islandData;
  });

  const handleBuyIsland = () => {
    const newId = (Object.keys(islands).length + 1).toString();
    const newIsland = generateNewIsland(newId);
    
    const updatedIslands = {
      ...islands,
      [newId]: newIsland
    };
    
    setIslands(updatedIslands);
    localStorage.setItem('treasureIslands', JSON.stringify(updatedIslands));
    
    toast({
      title: "New Island Purchased! 🏝️",
      description: `${newIsland.name} has been added to your collection.`,
      duration: 5000,
    });
  };

  const islandsList = Object.entries(islands).map(([id, data]) => ({
    id,
    name: data.name,
    climate: data.climate,
    terrain: data.terrain,
    dangerLevel: data.dangerLevel,
    imageUrl: `/lovable-uploads/b8de5ac2-3913-4942-bbc3-5b76abaa913d.png`
  }));

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Treasure Islands</h1>
            <p className="text-muted-foreground">Explore mysterious islands and hunt for treasure</p>
          </div>
          <Button 
            onClick={handleBuyIsland}
            className="bg-apple-accent hover:bg-apple-accent/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Buy a new Island
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {islandsList.map((island) => (
            <IslandCard key={island.id} {...island} />
          ))}
        </div>

        {treasureLocation && (
          <div className="mt-8 p-4 bg-black/10 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Current Treasure Location: Island {treasureLocation.islandId} at coordinates ({treasureLocation.coordinates.x}, {treasureLocation.coordinates.y})</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreasureIslands;