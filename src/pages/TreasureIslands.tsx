import { FilterSidebar } from "@/components/FilterSidebar";
import { IslandCard } from "@/components/IslandCard";
import { Header } from "@/components/Header";
import { MenuContent } from "@/components/MenuContent";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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
    name: "Serpent's Lagoon",
    climate: "Tropical",
    terrain: "Coastal",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1439405326854-014607f694d7",
  },
  {
    id: "008",
    name: "Echo Caverns",
    climate: "Humid",
    terrain: "Cave System",
    dangerLevel: "Medium" as const,
    imageUrl: "https://images.unsplash.com/photo-1496196614460-48988a57fccf",
  },
  {
    id: "009",
    name: "Crimson Reef",
    climate: "Tropical",
    terrain: "Coral Reef",
    dangerLevel: "Low" as const,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  },
  {
    id: "010",
    name: "Whispering Dunes",
    climate: "Desert",
    terrain: "Sand Dunes",
    dangerLevel: "High" as const,
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
  },
];

const TreasureIslands = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-pirate-navy transition-colors duration-300">
      <div className="flex pt-8">
        {/* Desktop Navigation Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-32 h-[calc(100vh-8rem)] bg-white/95 dark:bg-pirate-navy/50 p-4 border-r border-pirate-gold/20 overflow-y-auto">
          <MenuContent />
        </div>

        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block w-64 fixed left-64 top-32 h-[calc(100vh-8rem)] bg-white/95 dark:bg-pirate-navy/50 p-4 border-r border-pirate-gold/20 overflow-y-auto">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64 lg:ml-[32rem]">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-pirate text-pirate-navy dark:text-pirate-gold mb-2">
              Treasure Islands
            </h1>
            <p className="text-muted-foreground dark:text-pirate-gold/70">
              Explore mysterious islands and uncover hidden treasures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockIslands.map((island) => (
              <IslandCard key={island.id} {...island} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TreasureIslands;
