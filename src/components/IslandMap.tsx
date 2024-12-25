import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shovel } from "lucide-react";

interface IslandMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function IslandMap({ coordinates }: IslandMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSquareClick = (row: number, col: number) => {
    setSelectedSquare(`${row}-${col}`);
  };

  useEffect(() => {
    const container = mapContainer.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const renderGrid = () => {
    const gridSize = 100; // 100x100 grid = 10,000 squares
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
            onClick={() => handleSquareClick(i, j)}
          />
        );
      }
    }

    return squares;
  };

  return (
    <>
      <div
        ref={mapContainer}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute w-full h-full"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: "center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
            alt="Island Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0">{renderGrid()}</div>
        </div>
      </div>

      <Dialog open={!!selectedSquare} onOpenChange={() => setSelectedSquare(null)}>
        <DialogContent className="bg-white/95 dark:bg-pirate-navy border-pirate-gold/20">
          <DialogHeader>
            <DialogTitle className="font-pirate text-2xl text-pirate-navy dark:text-pirate-gold">
              Eyo hunter!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground dark:text-pirate-gold/70">
              Do ya think the treasure is here? Wanna dig?
            </p>
            <Button
              className="bg-pirate-gold hover:bg-pirate-gold/90 text-pirate-navy font-pirate text-lg"
              onClick={() => console.log(`Digging at square ${selectedSquare}`)}
            >
              <Shovel className="mr-2 h-5 w-5" />
              Dig Here
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}