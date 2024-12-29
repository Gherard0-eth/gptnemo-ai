import { FilterSidebar } from "@/components/FilterSidebar";
import { IslandCard } from "@/components/IslandCard";
import { MenuContent } from "@/components/MenuContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 transition-colors duration-300">
      <div className="flex pt-8">
        {/* Desktop Navigation Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-32 h-[calc(100vh-8rem)] bg-white/95 dark:bg-apple-gray-700/95 border-r border-apple-gray-200/20 dark:border-apple-gray-600/20 overflow-y-auto">
          <div className="p-6 space-y-6">
            <MenuContent />
          </div>
        </div>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isFilterOpen ? 'md:mr-64' : ''} md:ml-64`}>
          {/* Mobile Filter Button */}
          <div className="mb-6 flex justify-end md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filter Toggle Button */}
          <div className="mb-6 hidden md:flex justify-end">
            <Button
              variant="outline"
              className="w-auto"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? (
                <ChevronRight className="mr-2 h-4 w-4" />
              ) : (
                <ChevronLeft className="mr-2 h-4 w-4" />
              )}
              Filters
            </Button>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
              Treasure Islands
            </h1>
            <p className="text-apple-gray-500 dark:text-apple-gray-300">
              Explore mysterious islands and uncover hidden treasures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockIslands.map((island) => (
              <IslandCard key={island.id} {...island} />
            ))}
          </div>
        </main>

        {/* Filter Sidebar - Desktop */}
        <div 
          className={`hidden lg:block fixed right-0 top-32 h-[calc(100vh-8rem)] bg-white/95 dark:bg-apple-gray-700/95 border-l border-apple-gray-200/20 dark:border-apple-gray-600/20 overflow-y-auto transition-all duration-300 ${
            isFilterOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <div className="p-6">
            <FilterSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureIslands;