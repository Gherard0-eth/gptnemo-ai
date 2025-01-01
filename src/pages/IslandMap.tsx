import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IslandMap } from "@/components/IslandMap";
import { ChevronLeft } from "lucide-react";

const islandData = {
  "001": {
    coordinates: { lat: -8.4095, lng: 115.1889 },
  },
  "002": {
    coordinates: { lat: 25.0343, lng: -77.3963 },
  },
  "003": {
    coordinates: { lat: 64.9631, lng: -19.0208 },
  },
};

export default function IslandMapPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const island = islandData[id as keyof typeof islandData];

  if (!island) return <div>Island not found</div>;

  return (
    <div className="h-screen w-screen relative bg-apple-gray-700">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white/90 dark:bg-apple-gray-600/80 dark:hover:bg-apple-gray-600/90 backdrop-blur-sm rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="ml-2">Back</span>
      </Button>
      
      <IslandMap coordinates={island.coordinates} />
    </div>
  );
}