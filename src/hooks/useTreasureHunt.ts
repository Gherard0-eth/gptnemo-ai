import { useQuery } from "@tanstack/react-query";

interface TreasureLocation {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const ISLANDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const GRID_SIZE = 6;

const selectRandomLocation = (): TreasureLocation => {
  const randomIslandIndex = Math.floor(Math.random() * ISLANDS.length);
  const randomX = Math.floor(Math.random() * GRID_SIZE);
  const randomY = Math.floor(Math.random() * GRID_SIZE);

  return {
    islandId: ISLANDS[randomIslandIndex],
    coordinates: {
      x: randomX,
      y: randomY,
    }
  };
};

export const useTreasureHunt = () => {
  return useQuery({
    queryKey: ["treasureLocation"],
    queryFn: () => selectRandomLocation(),
    staleTime: Infinity, // Keep the same treasure location until page refresh
  });
};