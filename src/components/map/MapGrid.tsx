import { memo } from "react";
import { cn } from "@/lib/utils";

interface MapGridProps {
  onSquareClick: (row: number, col: number) => void;
  clusterId: number;
  dugTiles: Set<string>;
}

export const MapGrid = memo(function MapGrid({ onSquareClick, clusterId, dugTiles }: MapGridProps) {
  const gridSize = 6; // Changed from 10 to 6
  const squares = [];

  // Add coordinate labels
  const xAxisLabels = Array.from({ length: gridSize }, (_, i) => (
    <div
      key={`x-${i}`}
      className="absolute text-white text-xs font-mono"
      style={{
        left: `${((i + 0.5) * 100) / gridSize}%`,
        top: '-20px',
        transform: 'translateX(-50%)',
      }}
    >
      {i}
    </div>
  ));

  const yAxisLabels = Array.from({ length: gridSize }, (_, i) => (
    <div
      key={`y-${i}`}
      className="absolute text-white text-xs font-mono"
      style={{
        top: `${((i + 0.5) * 100) / gridSize}%`,
        left: '-20px',
        transform: 'translateY(-50%)',
      }}
    >
      {i}
    </div>
  ));

  // Create grid squares
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const row = i;
      const col = j;
      const tileId = `${row}-${col}`;
      const isDug = dugTiles.has(tileId);

      squares.push(
        <div
          key={tileId}
          className={cn(
            "absolute border border-white/20 cursor-pointer transition-all duration-200",
            isDug ? "bg-black/40" : "hover:bg-white/20 active:bg-white/30",
          )}
          style={{
            width: `${100 / gridSize}%`,
            height: `${100 / gridSize}%`,
            left: `${(j * 100) / gridSize}%`,
            top: `${(i * 100) / gridSize}%`,
          }}
          onClick={() => !isDug && onSquareClick(row, col)}
        />
      );
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-auto p-6">
      {/* Coordinate labels */}
      <div className="relative w-full h-full">
        {xAxisLabels}
        {yAxisLabels}
        {squares}
      </div>
    </div>
  );
});