import { useEffect, useRef, useState } from "react";
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
  const [scale, setScale] = useState(2);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      (e.target as any).dataset.initialPinchDistance = distance;
      (e.target as any).dataset.initialScale = scale;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      const initialDistance = parseFloat((e.target as any).dataset.initialPinchDistance);
      const initialScale = parseFloat((e.target as any).dataset.initialScale);
      
      if (initialDistance && initialScale) {
        const newScale = (distance / initialDistance) * initialScale;
        setScale(Math.min(Math.max(newScale, 0.8), 8));
      }
    }
  };

  useEffect(() => {
    const centerMap = () => {
      if (!mapContainer.current) return;
      const { width, height } = mapContainer.current.getBoundingClientRect();
      setPosition({ x: width / 4, y: height / 4 });
    };

    centerMap();
    window.addEventListener('resize', centerMap);

    const element = mapContainer.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('resize', centerMap);
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div
        ref={mapContainer}
        className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove as any}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove as any}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="absolute w-[300vw] h-[300vw]"
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

      <DigDialog
        selectedSquare={selectedSquare}
        onOpenChange={() => setSelectedSquare(null)}
      />
    </div>
  );
}