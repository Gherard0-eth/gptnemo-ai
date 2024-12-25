import { Button } from "@/components/ui/button";
import { Map, ArrowLeft, Mountain, Cloud, Anchor, Skull, LucideIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IslandCharacteristics } from "@/components/island/IslandCharacteristics";
import { IslandStats } from "@/components/island/IslandStats";

type DangerLevel = "Low" | "Medium" | "High";

interface Island {
  name: string;
  description: string;
  climate: string;
  terrain: string;
  dangerLevel: DangerLevel;
  coordinates: { lat: number; lng: number };
  characteristics: Array<{
    label: string;
    icon: LucideIcon;
  }>;
}

const islandData: Record<string, Island> = {
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
  const navigate = useNavigate();
  const island = islandData[id as keyof typeof islandData];

  if (!island) return <div>Island not found</div>;

  return (
    <div className="min-h-screen bg-background dark:bg-apple-gray-700 p-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 text-apple-gray-700 dark:text-apple-gray-100"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Island Details
      </Button>
      
      <div className="space-y-6 apple-container p-6">
        <h1 className="text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100">
          {island.name}
        </h1>
        
        <p className="text-apple-gray-500 dark:text-apple-gray-300">
          {island.description}
        </p>

        <IslandCharacteristics characteristics={island.characteristics} />
        
        <IslandStats
          climate={island.climate}
          terrain={island.terrain}
          dangerLevel={island.dangerLevel}
        />

        <Link to={`/island/${id}/map`}>
          <Button className="w-full apple-button mt-6">
            <Map className="mr-2 h-5 w-5" />
            Dig in the Island
          </Button>
        </Link>
      </div>
    </div>
  );
}