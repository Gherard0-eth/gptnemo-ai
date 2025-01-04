import { useEffect, useState } from "react";

interface TreasureLocation {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

const GRID_SIZE = 6;

const selectRandomLocation = (): TreasureLocation => {
  // Get available islands from localStorage or use default
  const savedIslands = localStorage.getItem('treasureIslands');
  const islands = savedIslands ? Object.keys(JSON.parse(savedIslands)) : ["1", "2", "3"];
  
  const randomIslandIndex = Math.floor(Math.random() * islands.length);
  const randomX = Math.floor(Math.random() * GRID_SIZE);
  const randomY = Math.floor(Math.random() * GRID_SIZE);

  return {
    islandId: islands[randomIslandIndex],
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