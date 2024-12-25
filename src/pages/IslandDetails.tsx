import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mountain, Cloud, Anchor, Skull, Map, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const island = islandData[id as keyof typeof islandData];

  if (!island) return <div>Island not found</div>;

  const dangerColor = {
    Low: "bg-green-500/20 hover:bg-green-500/30 text-green-500",
    Medium: "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500",
    High: "bg-red-500/20 hover:bg-red-500/30 text-red-500",
  }[island.dangerLevel];

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

        <div className="flex flex-wrap gap-3 mb-6">
          {island.characteristics.map((char, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-apple-gray-100/10 hover:bg-apple-gray-100/20 text-apple-gray-100 
                       border border-apple-gray-100/10 transition-colors px-3 py-1.5 
                       flex items-center gap-2"
            >
              <char.icon className="w-4 h-4" />
              <span>{char.label}</span>
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Badge
            variant="secondary"
            className="bg-apple-gray-100/10 hover:bg-apple-gray-100/20 text-apple-gray-100 
                     border border-apple-gray-100/10 transition-colors px-3 py-2
                     flex items-center gap-2 justify-center"
          >
            <Cloud className="w-4 h-4" />
            <span>Climate: {island.climate}</span>
          </Badge>

          <Badge
            variant="secondary"
            className="bg-apple-gray-100/10 hover:bg-apple-gray-100/20 text-apple-gray-100 
                     border border-apple-gray-100/10 transition-colors px-3 py-2
                     flex items-center gap-2 justify-center"
          >
            <Mountain className="w-4 h-4" />
            <span>Terrain: {island.terrain}</span>
          </Badge>

          <Badge
            variant="secondary"
            className={`${dangerColor} border border-current transition-colors px-3 py-2
                     flex items-center gap-2 justify-center`}
          >
            <Skull className="w-4 h-4" />
            <span>Danger Level: {island.dangerLevel}</span>
          </Badge>
        </div>

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