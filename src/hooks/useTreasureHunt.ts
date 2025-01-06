import { useEffect, useState } from "react";
import { aiAgent } from "@/utils/aiAgent";

interface TreasureLocation {
  islandId: string;
  coordinates: {
    x: number;
    y: number;
  };
}

export const useTreasureHunt = () => {
  const [currentTreasure, setCurrentTreasure] = useState<TreasureLocation | null>(() => {
    return aiAgent.getTreasureLocation();
  });

  useEffect(() => {
    if (!currentTreasure) {
      const location = aiAgent.getTreasureLocation();
      setCurrentTreasure(location);
    }
  }, [currentTreasure]);

  const generateNewTreasure = () => {
    aiAgent.resetTreasureLocation();
    const newLocation = aiAgent.getTreasureLocation();
    setCurrentTreasure(newLocation);
  };

  return {
    treasureLocation: currentTreasure,
    generateNewTreasure,
  };
};