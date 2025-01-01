import { useQuery } from "@tanstack/react-query";

interface TreasureLocation {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const ISLANDS = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010"];
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