import { memo } from "react";
import { cn } from "@/lib/utils";
import { Treasure } from "lucide-react";

interface MapGridProps {
  onSquareClick: (row: number, col: number) => void;
  clusterId: number;
  dugTiles: Set<string>;
  treasureFound?: string | null;
}

export const MapGrid = memo(function MapGrid({ onSquareClick, clusterId, dugTiles, treasureFound }: MapGridProps) {
  const gridSize = 6;
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
      const isTreasure = treasureFound === tileId;

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
        >
          {isDug && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              {isTreasure ? (
                <Treasure className="w-8 h-8 text-yellow-500 animate-bounce" />
              ) : (
                "❌"
              )}
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-auto p-6">
      <div className="relative w-full h-full">
        {xAxisLabels}
        {yAxisLabels}
        {squares}
      </div>
    </div>
  );
});