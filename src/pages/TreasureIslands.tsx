import { FilterSidebar } from "@/components/FilterSidebar";
import { IslandCard } from "@/components/IslandCard";
import { MenuContent } from "@/components/MenuContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";

const mockIslands = [
  {
    id: "001",
    name: "Skull's Haven",
    climate: "Tropical",
    terrain: "Volcanic",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
  },
  {
    id: "002",
    name: "Mermaid's Cove",
    climate: "Temperate",
    terrain: "Coral",
    dangerLevel: "Low" as const,
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
  },
  {
    id: "003",
    name: "Dragon's Lair",
    climate: "Stormy",
    terrain: "Rocky",
    dangerLevel: "Medium" as const,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: "004",
    name: "Phoenix Peak",
    climate: "Arid",
    terrain: "Mountain",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    id: "005",
    name: "Mystic Valley",
    climate: "Temperate",
    terrain: "Valley",
    dangerLevel: "Medium" as const,
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
  },
  {
    id: "006",
    name: "Frost Haven",
    climate: "Arctic",
    terrain: "Tundra",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    id: "007",
    name: "Serpent's Isle",
    climate: "Tropical",
    terrain: "Jungle",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
  },
  {
    id: "008",
    name: "Desert Mirage",
    climate: "Arid",
    terrain: "Desert",
    dangerLevel: "Medium" as const,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
  },
  {
    id: "009",
    name: "Komodo Sanctuary",
    climate: "Tropical",
    terrain: "Savanna",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1487252665478-49b61b47f302",
  },
  {
    id: "010",
    name: "Mountain Haven",
    climate: "Alpine",
    terrain: "Mountains",
    dangerLevel: "Medium" as const,
    imageUrl: "https://images.unsplash.com/photo-1438565434616-3ef039228b15",
  },
];

const TreasureIslands = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: treasureLocation } = useTreasureHunt();

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 transition-colors duration-300">
      <div className="flex pt-8">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
              Treasure Islands
            </h1>
            <p className="text-apple-gray-500 dark:text-apple-gray-300">
              Explore mysterious islands and uncover hidden treasures
            </p>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <FilterSidebar />
            </div>

            {/* Islands Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockIslands.map((island) => (
                  <IslandCard key={island.id} {...island} />
                ))}
              </div>
            </div>
          </div>

          {/* Debug Information */}
          <div className="mt-8 p-4 bg-black/10 rounded-lg">
            <h2 className="text-xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
              Debug Information
            </h2>
            <p className="text-apple-gray-500 dark:text-apple-gray-300">
              Treasure Location: Island {treasureLocation}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TreasureIslands;