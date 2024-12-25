import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mountain, Cloud, Anchor, Skull, Map, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { MenuContent } from "@/components/MenuContent";

const islandData = {
  "001": {
    name: "Skull's Haven",
    description: "A treacherous volcanic island shrouded in mystery. Ancient legends speak of a cursed treasure hidden within its depths, guarded by restless spirits of fallen pirates.",
    climate: "Tropical",
    terrain: "Volcanic",
    dangerLevel: "High",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Volcanic Activity", icon: Mountain },
      { label: "Dense Jungle", icon: Cloud },
      { label: "Cursed Waters", icon: Anchor },
      { label: "Ghost Ships", icon: Skull },
    ]
  },
  "002": {
    name: "Mermaid's Cove",
    description: "A peaceful coral paradise with crystal-clear waters. Local sailors whisper tales of merfolk protecting an underwater treasury of lost Spanish galleons.",
    climate: "Temperate",
    terrain: "Coral",
    dangerLevel: "Low",
    coordinates: { lat: 25.0343, lng: -77.3963 },
    characteristics: [
      { label: "Coral Reefs", icon: Cloud },
      { label: "Clear Waters", icon: Anchor },
      { label: "Friendly Merfolk", icon: Skull },
    ]
  },
  "003": {
    name: "Dragon's Lair",
    description: "A storm-battered rocky outcrop shaped like a sleeping dragon. They say the island's caves hold the accumulated wealth of a century of shipwrecks.",
    climate: "Stormy",
    terrain: "Rocky",
    dangerLevel: "Medium",
    coordinates: { lat: 64.9631, lng: -19.0208 },
    characteristics: [
      { label: "Treacherous Rocks", icon: Mountain },
      { label: "Storm Surges", icon: Cloud },
      { label: "Hidden Caves", icon: Skull },
    ]
  },
};

export default function IslandDetails() {
  const { id } = useParams();
  const island = islandData[id as keyof typeof islandData];

  if (!island) return <div>Island not found</div>;

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 transition-colors duration-300">
      <div className="flex pt-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-32 h-[calc(100vh-8rem)] bg-white/95 dark:bg-apple-gray-700/50 p-4 border-r border-apple-gray-200/20 dark:border-apple-gray-600/20 overflow-y-auto">
          <MenuContent />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/treasure-islands">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Treasure Islands
                </Button>
              </Link>
            </div>
            
            <h1 className="text-3xl font-display text-apple-gray-700 dark:text-apple-gray-100">
              {island.name}
            </h1>
            <p className="text-apple-gray-500 dark:text-apple-gray-300 mb-4">{island.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {island.characteristics.map((char, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-apple-gray-100 dark:bg-apple-gray-600 text-apple-gray-700 dark:text-apple-gray-100">
                  <char.icon className="w-3 h-3" />
                  {char.label}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <h3 className="font-display text-lg text-apple-gray-700 dark:text-apple-gray-100">Climate</h3>
                <p className="text-apple-gray-500 dark:text-apple-gray-300">{island.climate}</p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg text-apple-gray-700 dark:text-apple-gray-100">Terrain</h3>
                <p className="text-apple-gray-500 dark:text-apple-gray-300">{island.terrain}</p>
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg text-apple-gray-700 dark:text-apple-gray-100">Danger Level</h3>
                <p className="text-apple-gray-500 dark:text-apple-gray-300">{island.dangerLevel}</p>
              </div>
            </div>
          </div>

          <Link to={`/island/${id}/map`}>
            <Button className="w-full apple-button mb-6">
              <Map className="mr-2 h-5 w-5" />
              Dig in the Island
            </Button>
          </Link>

          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
              alt={`${island.name} Map Preview`}
              className="w-full h-64 object-cover"
            />
          </div>
        </main>
      </div>
    </div>
  );
}