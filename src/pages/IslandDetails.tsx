import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { IslandMap } from "@/components/IslandMap";
import { Header } from "@/components/Header";
import { MenuContent } from "@/components/MenuContent";
import { PrizePoolBanner } from "@/components/PrizePoolBanner";
import { Mountain, Cloud, Anchor, Skull } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

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
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  if (!island) return <div>Island not found</div>;

  return (
    <div className="min-h-screen bg-background dark:bg-pirate-navy transition-colors duration-300">
      <Header />
      <PrizePoolBanner />
      
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/95 dark:bg-pirate-navy/50 p-4 border-r border-pirate-gold/20 overflow-y-auto">
          <MenuContent />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64">
          <div className="mb-6">
            <h1 className="text-3xl font-pirate text-pirate-navy dark:text-pirate-gold">
              {island.name}
            </h1>
            <p className="text-muted-foreground mb-4">{island.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {island.characteristics.map((char, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <char.icon className="w-3 h-3" />
                  {char.label}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <h3 className="font-pirate text-lg text-pirate-navy dark:text-pirate-gold">Climate</h3>
                <p className="text-muted-foreground">{island.climate}</p>
              </div>
              <div className="text-center">
                <h3 className="font-pirate text-lg text-pirate-navy dark:text-pirate-gold">Terrain</h3>
                <p className="text-muted-foreground">{island.terrain}</p>
              </div>
              <div className="text-center">
                <h3 className="font-pirate text-lg text-pirate-navy dark:text-pirate-gold">Danger Level</h3>
                <p className="text-muted-foreground">{island.dangerLevel}</p>
              </div>
            </div>
          </div>

          <div 
            className="h-[600px] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setIsMapExpanded(true)}
          >
            <IslandMap coordinates={island.coordinates} />
          </div>

          <Dialog open={isMapExpanded} onOpenChange={setIsMapExpanded}>
            <DialogContent className="max-w-[95vw] w-[1200px] h-[90vh]">
              <div className="w-full h-full">
                <IslandMap coordinates={island.coordinates} />
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
