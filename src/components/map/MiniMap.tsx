import { memo } from "react";

interface MiniMapProps {
  position: { x: number; y: number };
  scale: number;
  onNavigate: (x: number, y: number) => void;
  dugTiles: Set<string>;
}

export const MiniMap = memo(function MiniMap({ position, scale, onNavigate, dugTiles }: MiniMapProps) {
  return (
    <div className="absolute top-2 left-2 w-24 h-24 md:w-32 md:h-32 bg-white/90 dark:bg-black/90 rounded-lg shadow-lg overflow-hidden z-10">
      <div className="relative w-full h-full">
        <img
          src="/lovable-uploads/83bb3fee-d72f-4649-85c3-c54b5bd5f72f.png"
          alt="Mini Map"
          className="w-full h-full object-cover opacity-80"
          draggable="false"
        />
        <div 
          className="absolute border-2 border-apple-accent animate-pulse"
          style={{
            left: `${50 + (position.x / (3 * scale))}%`,
            top: `${50 + (position.y / (3 * scale))}%`,
            width: `${100 / scale}%`,
            height: `${100 / scale}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        {Array.from(dugTiles).map(tileId => {
          const [row, col] = tileId.split('-').map(Number);
          return (
            <div
              key={tileId}
              className="absolute w-1 h-1 bg-apple-accent rounded-full"
              style={{
                left: `${(col / 50) * 100}%`,
                top: `${(row / 50) * 100}%`,
              }}
            />
          )}
        )}
      </div>
    </div>
  );
});