import { useState } from 'react';
import { useTreasureHunt } from '@/hooks/useTreasureHunt';
import { IslandCard } from '@/components/IslandCard';
import { islandData } from '@/data/islandData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TreasureIslands = () => {
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
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-6 text-apple-gray-700 dark:text-apple-gray-100"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-4">
            Treasure Islands
          </h1>
          <p className="text-apple-gray-600 dark:text-apple-gray-300">
            Explore these mysterious islands where Sandokhan, our AI Pirate, has hidden valuable treasures. 
            Each island holds unique challenges and opportunities. Use your shovels wisely, follow the hints, 
            and compete with treasure hunters worldwide to discover the hidden riches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default TreasureIslands;