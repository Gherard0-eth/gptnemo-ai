import { useEffect, useState } from "react";

interface TreasureLocation {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const ISLANDS = ["1", "2", "3"];
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
  const [currentTreasure, setCurrentTreasure] = useState<TreasureLocation | null>(() => {
    const stored = localStorage.getItem('currentTreasure');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!currentTreasure) {
      const newLocation = selectRandomLocation();
      setCurrentTreasure(newLocation);
      localStorage.setItem('currentTreasure', JSON.stringify(newLocation));
    }
  }, [currentTreasure]);

  const generateNewTreasure = () => {
    const newLocation = selectRandomLocation();
    setCurrentTreasure(newLocation);
    localStorage.setItem('currentTreasure', JSON.stringify(newLocation));
  };

  return {
    treasureLocation: currentTreasure,
    generateNewTreasure,
  };
};