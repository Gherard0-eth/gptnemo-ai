interface MapGridProps {
  onSquareClick: (row: number, col: number) => void;
}

export function MapGrid({ onSquareClick }: MapGridProps) {
  const gridSize = 50; // Reduced grid size for larger cells
  const squares = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      squares.push(
        <div
          key={`${i}-${j}`}
          className="absolute border border-white/20 cursor-pointer hover:bg-white/20 
                     active:bg-white/30 transition-colors duration-150"
          style={{
            width: `${100 / gridSize}%`,
            height: `${100 / gridSize}%`,
            left: `${(j * 100) / gridSize}%`,
            top: `${(i * 100) / gridSize}%`,
          }}
          onClick={() => onSquareClick(i, j)}
        />
      );
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-auto">
      {squares}
    </div>
  );
}