import { useState } from "react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { IslandCard } from "@/components/IslandCard";

const MOCK_ISLANDS = [
  {
    id: "1",
    name: "Skull Island",
    climate: "Tropical",
    terrain: "Mountainous",
    dangerLevel: "High" as const,
    imageUrl: "/lovable-uploads/83bb3fee-d72f-4649-85c3-c54b5bd5f72f.png"
  },
  {
    id: "2",
    name: "Palm Beach",
    climate: "Tropical",
    terrain: "Sandy",
    dangerLevel: "Low" as const,
    imageUrl: "/lovable-uploads/89c3491b-16e9-4b19-8004-9f5e66b901f5.png"
  },
  {
    id: "3",
    name: "Dragon's Lair",
    climate: "Volcanic",
    terrain: "Rocky",
    dangerLevel: "High" as const,
    imageUrl: "/lovable-uploads/a7a99faf-3a38-4061-b9dc-4f474001bf8f.png"
  },
  {
    id: "4",
    name: "Mermaid Cove",
    climate: "Temperate",
    terrain: "Coastal",
    dangerLevel: "Medium" as const,
    imageUrl: "/lovable-uploads/b8de5ac2-3913-4942-bbc3-5b76abaa913d.png"
  }
];

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

      {/* Island Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {MOCK_ISLANDS.map((island) => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>

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