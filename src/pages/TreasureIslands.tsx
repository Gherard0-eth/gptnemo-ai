import { useState } from "react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";

const TreasureIslands = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: treasureLocation, isLoading, error } = useTreasureHunt();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">Treasure Islands</h1>
        <div>Loading treasure location...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4">
        <h1 className="text-2xl font-bold mb-4">Treasure Islands</h1>
        <div className="text-red-500">Error loading treasure location</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 transition-colors duration-300">
      <header className="p-4">
        <h1 className="text-2xl font-bold">Treasure Islands</h1>
        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="mt-2">
          Toggle Filter
        </button>
      </header>

      {/* Debug Information */}
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