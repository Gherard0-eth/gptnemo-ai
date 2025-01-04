import { Mountain, Cloud, Anchor, Skull, Waves, Sun, Wind, Moon, Fish, Map, LucideIcon } from "lucide-react";

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
      { label: "Mermaid Sightings", icon: Fish },
      { label: "Ancient Ruins", icon: Anchor },
    ]
  },
  "5": {
    name: "Moonlight Bay",
    description: "A mysterious bay that glows under the full moon. Ancient maps suggest this location holds the key to a legendary pirate's fortune.",
    climate: "Moderate",
    terrain: "Coastal",
    dangerLevel: "Low",
    coordinates: { lat: 41.9028, lng: 12.4964 },
    characteristics: [
      { label: "Bioluminescent Waters", icon: Moon },
      { label: "Hidden Coves", icon: Mountain },
      { label: "Ancient Maps", icon: Map },
    ]
  },
  "6": {
    name: "Sun Serpent Isle",
    description: "An island where ancient serpent-like creatures are said to guard vast treasures. The tropical climate makes it a paradise, but dangers lurk beneath.",
    climate: "Tropical",
    terrain: "Jungle",
    dangerLevel: "High",
    coordinates: { lat: -3.7319, lng: -38.5267 },
    characteristics: [
      { label: "Dense Jungle", icon: Cloud },
      { label: "Mysterious Creatures", icon: Skull },
      { label: "Ancient Temples", icon: Sun },
    ]
  },
  "7": {
    name: "Windswept Peak",
    description: "A mountainous island where strong winds guard the secrets of lost expeditions. The howling gales are said to whisper clues to hidden treasures.",
    climate: "Windy",
    terrain: "Mountainous",
    dangerLevel: "Medium",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    characteristics: [
      { label: "Strong Winds", icon: Wind },
      { label: "Mountain Peaks", icon: Mountain },
      { label: "Lost Expeditions", icon: Map },
    ]
  },
  "8": {
    name: "Coral Crown",
    description: "A ring-shaped island surrounded by vibrant coral reefs. Pirates of old used this natural fortress to hide their most valuable treasures.",
    climate: "Tropical",
    terrain: "Coral",
    dangerLevel: "Low",
    coordinates: { lat: -17.7134, lng: 178.0650 },
    characteristics: [
      { label: "Coral Gardens", icon: Fish },
      { label: "Clear Lagoon", icon: Waves },
      { label: "Hidden Passages", icon: Anchor },
    ]
  },
  "9": {
    name: "Storm's End",
    description: "A perpetually storm-surrounded island that only reveals its secrets when the weather clears. Many believe it holds the treasure of the legendary Storm King.",
    climate: "Stormy",
    terrain: "Rocky",
    dangerLevel: "High",
    coordinates: { lat: 55.9533, lng: -3.1883 },
    characteristics: [
      { label: "Perpetual Storms", icon: Cloud },
      { label: "Dangerous Cliffs", icon: Mountain },
      { label: "Ancient Legend", icon: Skull },
    ]
  },
  "10": {
    name: "Golden Sands",
    description: "A desert island with golden beaches hiding centuries of buried treasures. The shifting sands reveal and conceal different clues with each passing day.",
    climate: "Arid",
    terrain: "Desert",
    dangerLevel: "Medium",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    characteristics: [
      { label: "Shifting Sands", icon: Wind },
      { label: "Ancient Ruins", icon: Sun },
      { label: "Hidden Oasis", icon: Map },
    ]
  }
};