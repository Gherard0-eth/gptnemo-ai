import { useState } from "react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { IslandCard } from "@/components/IslandCard";
import { islandData } from "@/data/islandData";

const TreasureIslands = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { treasureLocation } = useTreasureHunt();

  const islands = Object.entries(islandData).map(([id, data]) => ({
    id,
    name: data.name,
    climate: data.climate,
    terrain: data.terrain,
    dangerLevel: data.dangerLevel,
    imageUrl: `/lovable-uploads/b8de5ac2-3913-4942-bbc3-5b76abaa913d.png`
  }));

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 transition-colors duration-300">
      <header className="p-4">
        <h1 className="text-2xl font-bold">Treasure Islands</h1>
        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="mt-2">
          Toggle Filter
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {islands.map((island) => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>

      {treasureLocation && (
        <div className="mt-8 p-4 bg-black/10 rounded-lg">
          <h2 className="text-xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
            Debug Information
          </h2>
          <p className="text-apple-gray-500 dark:text-apple-gray-300">
            Treasure Location: Island {treasureLocation.islandId} at coordinates ({treasureLocation.coordinates.x}, {treasureLocation.coordinates.y})
          </p>
        </div>
      )}
    </div>
  );
};

export default TreasureIslands;