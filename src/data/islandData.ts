import { Mountain, Cloud, Anchor, Skull, LucideIcon } from "lucide-react";

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
      { label: "Friendly Merfolk", icon: Skull },
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
  },
  "4": {
    name: "Mermaid Cove",
    description: "A mystical cove where mermaids are said to guard ancient treasures. The crystal-clear waters hide countless secrets beneath their surface.",
    climate: "Temperate",
    terrain: "Coastal",
    dangerLevel: "Medium",
    coordinates: { lat: 35.6892, lng: 139.6922 },
    characteristics: [
      { label: "Clear Waters", icon: Cloud },
      { label: "Hidden Reefs", icon: Mountain },
      { label: "Mermaid Sightings", icon: Skull },
      { label: "Ancient Ruins", icon: Anchor },
    ]
  }
};