import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapControls } from "./map/MapControls";
import { MapGrid } from "./map/MapGrid";
import { DigDialog } from "./map/DigDialog";

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
  const isMobile = useIsMobile();

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev * 0.8, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      setPosition({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSquareClick = (row: number, col: number) => {
    setSelectedSquare(`${row}-${col}`);
  };

  // Reset position and scale when component mounts
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing rounded-lg touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove as any}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove as any}
        onTouchEnd={handleMouseUp}
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
          <MapGrid onSquareClick={handleSquareClick} />
        </div>
      </div>

      <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

      <DigDialog
        selectedSquare={selectedSquare}
        onOpenChange={() => setSelectedSquare(null)}
      />
    </div>
  );
}