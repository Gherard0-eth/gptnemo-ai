import { Mountain, Cloud, Anchor, Skull, Waves, Sun, Wind, Moon, Fish, Map, LucideIcon } from "lucide-react";

export type DangerLevel = "Low" | "Medium" | "High";

export interface Island {
  name: string;
  description: string;
  climate: string;
  terrain: string;
  dangerLevel: DangerLevel;
  coordinates: { lat: number; lng: number };
  imageUrl: string;
  characteristics: Array<{
    label: string;
    icon: LucideIcon;
  }>;
}

export const islandData: Record<string, Island> = {
  "1": {
    name: "Skull's Haven",
    description: "Skull's Haven is a treacherous volcanic island shrouded in mystery, where danger lurks at every turn. Ancient legends speak of a cursed treasure hidden deep within its fiery depths, fiercely protected by the restless spirits of fallen pirates who once ruled these waters. Dense, impenetrable jungles cover its rugged terrain, concealing countless secrets and perilous traps set by the island's past inhabitants. Its cursed waters are patrolled by ghost ships, their spectral crews eternally bound to the island's dark curse.\n\nThe island's volatile climate alternates between scorching heat and torrential tropical storms, making survival a challenge even for the bravest explorers. Lava flows carve through the volcanic landscape, creating an ever-changing terrain of molten rivers and jagged rocks. Whispers of the undead and eerie glowing lights are said to haunt the island at night, driving many who dare to venture there to madness.\n\nDespite the danger, Skull's Haven continues to lure treasure hunters, adventurers, and fortune seekers, drawn by tales of unimaginable wealth hidden beneath its fiery peaks. Yet, none return unscathed—if they return at all. Enter at your own risk, for this island does not easily relinquish its secrets.",
    climate: "Tropical",
    terrain: "Volcanic",
    dangerLevel: "High",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    imageUrl: "/lovable-uploads/d98da54d-ba61-4894-ae87-989068f62342.png",
    characteristics: [
      { label: "Volcanic Activity", icon: Mountain },
      { label: "Dense Jungle", icon: Cloud },
      { label: "Cursed Waters", icon: Anchor },
      { label: "Ghost Ships", icon: Skull },
    ]
  },
  "2": {
    name: "Palm Beach",
    description: "A peaceful coral paradise with crystal-clear waters. Local sailors whisper tales of merfolk protecting an underwater treasury of lost Spanish galleons.",
    climate: "Temperate",
    terrain: "Sandy",
    dangerLevel: "Low",
    coordinates: { lat: 25.0343, lng: -77.3963 },
    imageUrl: "/lovable-uploads/16fbdde1-d5b6-4584-b1a6-0034363adfda.png",
    characteristics: [
      { label: "Coral Reefs", icon: Cloud },
      { label: "Clear Waters", icon: Anchor },
      { label: "Friendly Merfolk", icon: Fish },
    ]
  },
  "3": {
    name: "Dragon's Lair",
    description: "A storm-battered rocky outcrop shaped like a sleeping dragon. They say the island's caves hold the accumulated wealth of a century of shipwrecks.",
    climate: "Stormy",
    terrain: "Rocky",
    dangerLevel: "Medium",
    coordinates: { lat: 64.9631, lng: -19.0208 },
    imageUrl: "/lovable-uploads/355f803a-4206-40f1-817a-9835166f8459.png",
    characteristics: [
      { label: "Treacherous Rocks", icon: Mountain },
      { label: "Storm Surges", icon: Cloud },
      { label: "Hidden Caves", icon: Skull },
    ]
  }
};