import { Cloud, Skull, Mountain, Anchor } from "lucide-react";

export interface Island {
  name: string;
  description: string;
  climate: string;
  terrain: string;
  dangerLevel: string;
  coordinates: { lat: number; lng: number };
  characteristics: { label: string; icon: any }[];
}

export const islandData: Record<string, Island> = {
  "001": {
    name: "Skull's Haven",
    description: "A treacherous island known for its hidden caves and pirate legends.",
    climate: "Tropical",
    terrain: "Volcanic",
    dangerLevel: "High",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Hidden Caves", icon: Cloud },
      { label: "Pirate Legends", icon: Skull },
      { label: "Volcanic Activity", icon: Mountain },
      { label: "Treasure Maps", icon: Anchor },
    ],
  },
  "002": {
    name: "Mermaid's Cove",
    description: "A serene cove where mermaids are said to sing and lure sailors.",
    climate: "Temperate",
    terrain: "Coral",
    dangerLevel: "Low",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Mermaid Songs", icon: Cloud },
      { label: "Coral Reefs", icon: Skull },
      { label: "Calm Waters", icon: Mountain },
      { label: "Hidden Treasures", icon: Anchor },
    ],
  },
  "003": {
    name: "Dragon's Lair",
    description: "An island rumored to be home to a fierce dragon guarding its treasure.",
    climate: "Stormy",
    terrain: "Rocky",
    dangerLevel: "Medium",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Dragon Sightings", icon: Cloud },
      { label: "Rocky Terrain", icon: Skull },
      { label: "Stormy Weather", icon: Mountain },
      { label: "Hidden Caves", icon: Anchor },
    ],
  },
  "004": {
    name: "Phoenix Peak",
    description: "A mystical mountain where the legendary phoenix is said to rise from the ashes.",
    climate: "Arid",
    terrain: "Mountain",
    dangerLevel: "High",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Phoenix Legends", icon: Cloud },
      { label: "Mountain Climbing", icon: Skull },
      { label: "Arid Climate", icon: Mountain },
      { label: "Hidden Treasures", icon: Anchor },
    ],
  },
  "005": {
    name: "Mystic Valley",
    description: "A lush valley filled with ancient ruins and hidden secrets.",
    climate: "Temperate",
    terrain: "Valley",
    dangerLevel: "Medium",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Ancient Ruins", icon: Cloud },
      { label: "Lush Vegetation", icon: Skull },
      { label: "Hidden Paths", icon: Mountain },
      { label: "Treasure Hunts", icon: Anchor },
    ],
  },
  "006": {
    name: "Frost Haven",
    description: "A chilling island where the frost never melts and secrets lie buried.",
    climate: "Arctic",
    terrain: "Tundra",
    dangerLevel: "High",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Frozen Treasures", icon: Cloud },
      { label: "Arctic Wildlife", icon: Skull },
      { label: "Icy Terrain", icon: Mountain },
      { label: "Hidden Caves", icon: Anchor },
    ],
  },
  "007": {
    name: "Serpent's Lagoon",
    description: "A mysterious lagoon where ancient sea serpents are said to guard sunken treasures. The waters are treacherous, and the legends of massive sea creatures keep most adventurers at bay.",
    climate: "Tropical",
    terrain: "Coastal",
    dangerLevel: "High",
    coordinates: { lat: -8.4095, lng: 115.1889 },
    characteristics: [
      { label: "Deep Waters", icon: Cloud },
      { label: "Sea Serpents", icon: Skull },
      { label: "Hidden Reefs", icon: Mountain },
      { label: "Whirlpools", icon: Anchor },
    ],
  },
  "008": {
    name: "Echo Caverns",
    description: "An intricate network of caves where sound plays tricks on explorers. Ancient civilizations used these caves to hide their most valuable treasures.",
    climate: "Humid",
    terrain: "Cave System",
    dangerLevel: "Medium",
    coordinates: { lat: 20.7097, lng: -156.2533 },
    characteristics: [
      { label: "Echo Chambers", icon: Cloud },
      { label: "Crystal Formations", icon: Mountain },
      { label: "Underground Rivers", icon: Anchor },
      { label: "Ancient Markings", icon: Skull },
    ],
  },
  "009": {
    name: "Crimson Reef",
    description: "A vibrant coral reef system hiding countless shipwrecks and their treasures. The beautiful but dangerous marine life keeps most treasure hunters at a safe distance.",
    climate: "Tropical",
    terrain: "Coral Reef",
    dangerLevel: "Low",
    coordinates: { lat: -16.5004, lng: 145.9812 },
    characteristics: [
      { label: "Coral Maze", icon: Mountain },
      { label: "Shipwrecks", icon: Anchor },
      { label: "Marine Life", icon: Skull },
      { label: "Clear Waters", icon: Cloud },
    ],
  },
  "010": {
    name: "Whispering Dunes",
    description: "An endless desert where the winds whisper ancient secrets. Lost caravans and their treasures lie buried beneath the ever-shifting sands.",
    climate: "Desert",
    terrain: "Sand Dunes",
    dangerLevel: "High",
    coordinates: { lat: 23.4162, lng: 25.6628 },
    characteristics: [
      { label: "Shifting Sands", icon: Cloud },
      { label: "Mirages", icon: Mountain },
      { label: "Sand Storms", icon: Skull },
      { label: "Ancient Ruins", icon: Anchor },
    ],
  },
};

const IslandDetails = () => {
  return (
    <div>
      {/* Implementation of Island Details component will go here */}
    </div>
  );
};

export default IslandDetails;