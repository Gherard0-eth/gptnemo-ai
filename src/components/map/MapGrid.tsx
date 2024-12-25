interface MapGridProps {
  onSquareClick: (row: number, col: number) => void;
}

export function MapGrid({ onSquareClick }: MapGridProps) {
  const gridSize = 10;
  const squares = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      squares.push(
        <div
          key={`${i}-${j}`}
          className="absolute border border-white/30 cursor-pointer hover:bg-white/10 transition-colors"
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

  return <div className="absolute inset-0">{squares}</div>;
}