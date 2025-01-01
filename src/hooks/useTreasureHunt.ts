import { useQuery } from "@tanstack/react-query";

const ISLANDS = ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010"];

const selectRandomIsland = () => {
  const randomIndex = Math.floor(Math.random() * ISLANDS.length);
  return ISLANDS[randomIndex];
};

export const useTreasureHunt = () => {
  return useQuery({
    queryKey: ["treasureLocation"],
    queryFn: () => selectRandomIsland(),
    staleTime: Infinity, // Keep the same treasure location until page refresh
  });
};