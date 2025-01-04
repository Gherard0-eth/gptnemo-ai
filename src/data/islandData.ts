import { Mountain, Cloud, Anchor, Skull, Fish, Map, Sun, LucideIcon } from "lucide-react";

export type DangerLevel = "Low" | "Medium" | "High";

export interface Island {
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

// Helper function to generate random coordinates
const generateRandomCoordinates = () => ({
  lat: Math.random() * 180 - 90, // -90 to 90
  lng: Math.random() * 360 - 180, // -180 to 180
});

// Helper function to generate a random island name
const generateIslandName = () => {
  const prefixes = ["Mystic", "Dragon's", "Pirate's", "Storm", "Golden", "Crystal"];
  const suffixes = ["Haven", "Isle", "Cove", "Bay", "Peak", "Sanctuary"];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

// Helper function to generate random characteristics
const generateCharacteristics = () => {
  const possibleCharacteristics = [
    { label: "Volcanic Activity", icon: Mountain },
    { label: "Dense Jungle", icon: Cloud },
    { label: "Hidden Caves", icon: Anchor },
    { label: "Ancient Ruins", icon: Skull },
    { label: "Coral Reefs", icon: Fish },
    { label: "Lost Maps", icon: Map },
    { label: "Tropical Climate", icon: Sun },
  ];
  
  const numCharacteristics = Math.floor(Math.random() * 3) + 2; // 2-4 characteristics
  const shuffled = [...possibleCharacteristics].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCharacteristics);
};

// Helper function to generate a new island
export const generateNewIsland = (id: string): Island => {
  const climates = ["Tropical", "Temperate", "Stormy", "Arid"];
  const terrains = ["Volcanic", "Sandy", "Rocky", "Jungle", "Coastal"];
  const dangerLevels: DangerLevel[] = ["Low", "Medium", "High"];

  return {
    name: generateIslandName(),
    description: `A mysterious island waiting to be explored. Local legends speak of hidden treasures and ancient secrets buried within its depths.`,
    climate: climates[Math.floor(Math.random() * climates.length)],
    terrain: terrains[Math.floor(Math.random() * terrains.length)],
    dangerLevel: dangerLevels[Math.floor(Math.random() * dangerLevels.length)],
    coordinates: generateRandomCoordinates(),
    characteristics: generateCharacteristics(),
  };
};

export const islandData: Record<string, Island> = {
  "1": {
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
  "2": {
    name: "Palm Beach",
    description: "A peaceful coral paradise with crystal-clear waters. Local sailors whisper tales of merfolk protecting an underwater treasury of lost Spanish galleons.",
    climate: "Temperate",
    terrain: "Sandy",
    dangerLevel: "Low",
    coordinates: { lat: 25.0343, lng: -77.3963 },
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
    characteristics: [
      { label: "Treacherous Rocks", icon: Mountain },
      { label: "Storm Surges", icon: Cloud },
      { label: "Hidden Caves", icon: Skull },
    ]
  }
};