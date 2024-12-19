import { FilterSidebar } from "@/components/FilterSidebar";
import { IslandCard } from "@/components/IslandCard";

// Mock data for initial display
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
];

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <FilterSidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-pirate text-pirate-navy mb-2">
            Treasure Islands
          </h1>
          <p className="text-muted-foreground">
            Explore mysterious islands and uncover hidden treasures
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockIslands.map((island) => (
            <IslandCard key={island.id} {...island} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;