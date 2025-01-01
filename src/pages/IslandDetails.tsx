import { Button } from "@/components/ui/button";
import { Map, ArrowLeft, Mountain, Cloud, Anchor, Skull, LucideIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IslandCharacteristics } from "@/components/island/IslandCharacteristics";
import { IslandStats } from "@/components/island/IslandStats";
import { useToast } from "@/components/ui/use-toast";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { MapGrid } from "@/components/map/MapGrid";
import { DigDialog } from "@/components/map/DigDialog";
import { useState } from "react";

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
  "004": {
    name: "Phoenix Peak",
    description: "A mystical mountain where legends say an ancient phoenix guards a treasure of immeasurable value. The scorching heat and treacherous terrain make this a challenging conquest.",
    climate: "Arid",
    terrain: "Mountain",
    dangerLevel: "High",
    coordinates: { lat: 35.6892, lng: 139.6922 },
    characteristics: [
      { label: "Extreme Heat", icon: Cloud },
      { label: "Steep Cliffs", icon: Mountain },
      { label: "Phoenix Sightings", icon: Skull },
      { label: "Ancient Ruins", icon: Anchor },
    ]
  },
  "005": {
    name: "Mystic Valley",
    description: "A serene valley shrouded in perpetual mist, where ancient tribes once buried their treasures. The fog plays tricks on the mind, making navigation a constant challenge.",
    climate: "Temperate",
    terrain: "Valley",
    dangerLevel: "Medium",
    coordinates: { lat: 27.1751, lng: 78.0421 },
    characteristics: [
      { label: "Dense Fog", icon: Cloud },
      { label: "Hidden Paths", icon: Mountain },
      { label: "Ancient Spirits", icon: Skull },
      { label: "Sacred Ground", icon: Anchor },
    ]
  },
  "006": {
    name: "Frost Haven",
    description: "An arctic fortress where ice giants are said to guard the lost treasures of ancient Nordic explorers. The extreme cold and unpredictable weather make this island particularly dangerous.",
    climate: "Arctic",
    terrain: "Tundra",
    dangerLevel: "High",
    coordinates: { lat: 78.2232, lng: 15.6267 },
    characteristics: [
      { label: "Extreme Cold", icon: Cloud },
      { label: "Ice Caves", icon: Mountain },
      { label: "Ice Giants", icon: Skull },
      { label: "Frozen Ships", icon: Anchor },
    ]
  },
  "007": {
    name: "Serpent's Isle",
    description: "A mysterious island where giant sea serpents patrol the waters. Ancient mariners' logs speak of a treasure chamber hidden beneath the coils of a sleeping serpent god.",
    climate: "Tropical",
    terrain: "Jungle",
    dangerLevel: "High",
    coordinates: { lat: -16.5004, lng: -151.7415 },
    characteristics: [
      { label: "Sea Serpents", icon: Skull },
      { label: "Dense Jungle", icon: Cloud },
      { label: "Hidden Temple", icon: Mountain },
      { label: "Treacherous Waters", icon: Anchor },
    ]
  },
  "008": {
    name: "Desert Mirage",
    description: "An island that appears and disappears with the desert winds. Legends tell of a vast treasure chamber that only reveals itself during the full moon.",
    climate: "Arid",
    terrain: "Desert",
    dangerLevel: "Medium",
    coordinates: { lat: 23.4162, lng: 25.6628 },
    characteristics: [
      { label: "Shifting Sands", icon: Cloud },
      { label: "Ancient Ruins", icon: Mountain },
      { label: "Desert Spirits", icon: Skull },
      { label: "Hidden Oasis", icon: Anchor },
    ]
  },
  "009": {
    name: "Komodo Sanctuary",
    description: "A tropical paradise guarded by ancient dragons. Pirates of old used this island as their ultimate vault, knowing the fearsome guardians would keep their treasures safe.",
    climate: "Tropical",
    terrain: "Savanna",
    dangerLevel: "High",
    coordinates: { lat: -8.5527, lng: 119.4917 },
    characteristics: [
      { label: "Dragon Guardians", icon: Skull },
      { label: "Tropical Heat", icon: Cloud },
      { label: "Hidden Caves", icon: Mountain },
      { label: "Ancient Traps", icon: Anchor },
    ]
  },
  "010": {
    name: "Mountain Haven",
    description: "A mystical peak shrouded in eternal clouds. They say the mountain itself guards the accumulated wealth of an ancient civilization that once thrived here.",
    climate: "Alpine",
    terrain: "Mountains",
    dangerLevel: "Medium",
    coordinates: { lat: 27.9881, lng: 86.9250 },
    characteristics: [
      { label: "High Altitude", icon: Mountain },
      { label: "Eternal Snow", icon: Cloud },
      { label: "Mountain Spirits", icon: Skull },
      { label: "Ancient Temples", icon: Anchor },
    ]
  },
};

export default function IslandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: treasureLocation } = useTreasureHunt();
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [dugTiles, setDugTiles] = useState<Set<string>>(new Set());
  
  const island = islandData[id as keyof typeof islandData];

  if (!island) return <div>Island not found</div>;

  const handleSquareClick = (row: number, col: number) => {
    setSelectedSquare(`${row}-${col}`);
  };

  const handleDig = (tileId: string) => {
    setDugTiles(new Set([...dugTiles, tileId]));
    setSelectedSquare(null);

    if (id === treasureLocation) {
      toast({
        title: "🎉 CONGRATULATIONS! 🎉",
        description: "You've found the treasure! This is indeed the correct island!",
        duration: null, // Makes the toast stay until dismissed
        className: "w-full max-w-3xl", // Makes the toast wider
      });
    } else {
      toast({
        title: "Keep searching! ⛵",
        description: "The treasure is not on this island. Try another one!",
        duration: 3000,
      });
    }
  };

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

        <div className="mt-8">
          <h2 className="text-2xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-4">
            Explore the Island
          </h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden relative">
            <img 
              src="/lovable-uploads/b8de5ac2-3913-4942-bbc3-5b76abaa913d.png"
              alt="Island visualization"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30">
              <MapGrid
                onSquareClick={handleSquareClick}
                clusterId={parseInt(id || "0", 10) - 1}
                dugTiles={dugTiles}
              />
            </div>
          </div>
        </div>

        <DigDialog
          selectedSquare={selectedSquare}
          onOpenChange={(open) => !open && setSelectedSquare(null)}
          onDig={handleDig}
        />
      </div>
    </div>
  );
}