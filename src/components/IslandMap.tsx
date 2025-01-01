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
    setScale((prev) => Math.min(prev * 1.2, 5));
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

  useEffect(() => {
    const centerMap = () => {
      if (!mapContainer.current) return;
      const { width, height } = mapContainer.current.getBoundingClientRect();
      setPosition({ x: width / 4, y: height / 4 });
    };

    centerMap();
    window.addEventListener('resize', centerMap);
    return () => window.removeEventListener('resize', centerMap);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing rounded-lg touch-none bg-apple-gray-700"
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
            src="/lovable-uploads/83bb3fee-d72f-4649-85c3-c54b5bd5f72f.png"
            alt="Island Map"
            className="w-full h-full object-cover"
          />
          <MapGrid onSquareClick={handleSquareClick} />
        </div>
      </div>

      <MapControls 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut}
        className={`absolute ${isMobile ? 'bottom-4 right-4' : 'top-4 right-4'}`}
      />

      <DigDialog
        selectedSquare={selectedSquare}
        onOpenChange={() => setSelectedSquare(null)}
      />
    </div>
  );
}