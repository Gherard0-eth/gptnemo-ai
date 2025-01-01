import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [currentTreasure, setCurrentTreasure] = useState<TreasureLocation | null>(null);

  useEffect(() => {
    if (!currentTreasure) {
      setCurrentTreasure(selectRandomLocation());
    }
  }, [currentTreasure]);

  const generateNewTreasure = () => {
    setCurrentTreasure(selectRandomLocation());
  };

  return {
    treasureLocation: currentTreasure,
    generateNewTreasure,
  };
};