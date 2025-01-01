import { useEffect, useRef, useState } from "react";
import * as PIXI from 'pixi.js';
import { MapGrid } from "./map/MapGrid";
import { DigDialog } from "./map/DigDialog";
import { MiniMap } from "./map/MiniMap";
import { MapCluster } from "./map/MapCluster";
import { Button } from "./ui/button";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [currentCluster, setCurrentCluster] = useState<number | null>(null);
  const [dugTiles, setDugTiles] = useState<Set<string>>(new Set());

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
    const tileId = `${row}-${col}`;
    if (!dugTiles.has(tileId)) {
      setSelectedSquare(tileId);
    }
  };

  const handleDig = (tileId: string) => {
    setDugTiles(prev => new Set([...prev, tileId]));
    setSelectedSquare(null);
  };

  const handleClusterClick = (clusterId: number) => {
    setCurrentCluster(clusterId);
    setScale(3); // Zoom in when selecting a cluster
  };

  return (
    <div className="relative h-[calc(100vh-6rem)] mx-auto max-w-7xl px-4 py-8">
      <div className="apple-container bg-apple-gray-100/80 dark:bg-apple-gray-600/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
        {/* Mini-map toggle */}
        <Button
          variant="ghost"
          className="absolute top-4 right-4 z-10"
          onClick={() => setShowMiniMap(!showMiniMap)}
        >
          <Compass className={cn(
            "w-6 h-6 transition-transform",
            showMiniMap && "rotate-180"
          )} />
        </Button>

        {/* Mini-map */}
        {showMiniMap && (
          <MiniMap
            position={position}
            scale={scale}
            onNavigate={(x, y) => setPosition({ x, y })}
            dugTiles={dugTiles}
          />
        )}

        {/* Main map area */}
        <div className="relative h-full">
          <div
            ref={mapContainer}
            className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
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
              
              {currentCluster === null ? (
                <MapCluster onClusterClick={handleClusterClick} />
              ) : (
                <MapGrid 
                  onSquareClick={handleSquareClick}
                  clusterId={currentCluster}
                  dugTiles={dugTiles}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <DigDialog
        selectedSquare={selectedSquare}
        onOpenChange={() => setSelectedSquare(null)}
        onDig={handleDig}
      />
    </div>
  );
}