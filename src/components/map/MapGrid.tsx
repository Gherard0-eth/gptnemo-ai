import { memo } from "react";
import { cn } from "@/lib/utils";

interface MapGridProps {
  onSquareClick: (row: number, col: number) => void;
  clusterId: number;
  dugTiles: Set<string>;
}

export const MapGrid = memo(function MapGrid({ onSquareClick, clusterId, dugTiles }: MapGridProps) {
  const gridSize = 10; // 10x10 grid per cluster
  const clusterRow = Math.floor(clusterId / 5);
  const clusterCol = clusterId % 5;
  const squares = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const row = clusterRow * gridSize + i;
      const col = clusterCol * gridSize + j;
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
    <div className="absolute inset-0 pointer-events-auto">
      {squares}
    </div>
  );
});