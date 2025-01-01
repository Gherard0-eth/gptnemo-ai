import { memo } from "react";

interface MapClusterProps {
  onClusterClick: (clusterId: number) => void;
}

export const MapCluster = memo(function MapCluster({ onClusterClick }: MapClusterProps) {
  const clusterSize = 5;
  const clusters = [];

  for (let i = 0; i < clusterSize; i++) {
    for (let j = 0; j < clusterSize; j++) {
      const clusterId = i * clusterSize + j;
      clusters.push(
        <div
          key={clusterId}
          className="absolute border border-white/40 hover:border-white/60 
                     hover:bg-white/10 transition-colors duration-200 cursor-pointer
                     backdrop-blur-sm group"
          style={{
            width: `${100 / clusterSize}%`,
            height: `${100 / clusterSize}%`,
            left: `${(j * 100) / clusterSize}%`,
            top: `${(i * 100) / clusterSize}%`,
          }}
          onClick={() => onClusterClick(clusterId)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-base md:text-lg font-display font-semibold 
                           bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm
                           group-hover:bg-black/70 transition-colors">
              Region {clusterId + 1}
            </span>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-auto">
      {clusters}
    </div>
  );
});