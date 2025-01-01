interface MiniMapProps {
  position: { x: number; y: number };
  scale: number;
  dugTiles: Set<string>;
}

export function MiniMap({ position, scale, dugTiles }: MiniMapProps) {
  const viewportSize = 100; // Size of the minimap in pixels
  const mapSize = 250; // Number of tiles
  
  // Calculate the visible area
  const tileSize = viewportSize / mapSize;
  const viewportWidth = viewportSize / scale;
  const viewportHeight = viewportSize / scale;
  
  return (
    <div className="apple-container p-2">
      <div 
        className="relative w-[100px] h-[100px] bg-apple-gray-100 dark:bg-apple-gray-600"
      >
        {/* Render dug tiles */}
        {Array.from(dugTiles).map(coord => {
          const [row, col] = coord.split('-').map(Number);
          return (
            <div
              key={coord}
              className="absolute bg-apple-gray-300 dark:bg-apple-gray-500"
              style={{
                left: col * tileSize,
                top: row * tileSize,
                width: tileSize,
                height: tileSize,
              }}
            />
          );
        })}
        
        {/* Viewport indicator */}
        <div
          className="absolute border-2 border-apple-accent pointer-events-none"
          style={{
            left: (-position.x / (44 * scale)) * tileSize,
            top: (-position.y / (44 * scale)) * tileSize,
            width: viewportWidth,
            height: viewportHeight,
          }}
        />
      </div>
    </div>
  );
}