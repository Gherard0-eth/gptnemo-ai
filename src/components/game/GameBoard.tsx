import { useCallback, useEffect, useRef, useState } from 'react';
import { GameTile } from './GameTile';
import { MiniMap } from './MiniMap';
import { ZoomControls } from './ZoomControls';
import { useGameLogic } from '@/hooks/useGameLogic';

interface GameBoardProps {
  onTreasureFound: () => void;
}

export function GameBoard({ onTreasureFound }: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const { dugTiles, treasureLocation, handleDig } = useGameLogic({
    onTreasureFound,
    gridSize: 250,
  });

  const handleZoom = useCallback((delta: number) => {
    setScale(prev => Math.min(Math.max(0.2, prev + delta), 2));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Calculate boundaries
    const maxOffset = 250 * 44 * scale;
    const boundedX = Math.min(Math.max(newX, -maxOffset), maxOffset);
    const boundedY = Math.min(Math.max(newY, -maxOffset), maxOffset);
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleZoom(e.deltaY * -0.001);
    };

    const board = boardRef.current;
    if (board) {
      board.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (board) {
        board.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleZoom]);

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] overflow-hidden">
      <div
        ref={boardRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute origin-center transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          {Array.from({ length: 250 }, (_, row) => (
            <div key={row} className="flex">
              {Array.from({ length: 250 }, (_, col) => (
                <GameTile
                  key={`${row}-${col}`}
                  isDug={dugTiles.has(`${row}-${col}`)}
                  isTreasure={treasureLocation.row === row && treasureLocation.col === col}
                  onClick={() => handleDig(row, col)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 space-y-4">
        <ZoomControls
          scale={scale}
          onZoomIn={() => handleZoom(0.1)}
          onZoomOut={() => handleZoom(-0.1)}
        />
        <MiniMap
          position={position}
          scale={scale}
          dugTiles={dugTiles}
        />
      </div>
    </div>
  );
}