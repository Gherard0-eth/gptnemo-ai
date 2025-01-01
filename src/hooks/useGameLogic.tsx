import { useState, useCallback } from 'react';

interface UseGameLogicProps {
  onTreasureFound: () => void;
  gridSize: number;
}

export function useGameLogic({ onTreasureFound, gridSize }: UseGameLogicProps) {
  const [dugTiles] = useState<Set<string>>(new Set());
  const [treasureLocation] = useState(() => ({
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize),
  }));

  const handleDig = useCallback((row: number, col: number) => {
    const tileKey = `${row}-${col}`;
    if (dugTiles.has(tileKey)) return;
    
    dugTiles.add(tileKey);
    
    if (row === treasureLocation.row && col === treasureLocation.col) {
      onTreasureFound();
    }
  }, [dugTiles, treasureLocation, onTreasureFound]);

  return {
    dugTiles,
    treasureLocation,
    handleDig,
  };
}