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
    <div className="fixed inset-0 bg-apple-gray-700">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 bg-white/90 hover:bg-white dark:bg-apple-gray-600/90 
                   dark:hover:bg-apple-gray-600 backdrop-blur-sm rounded-full shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="ml-2">Back</span>
      </Button>
      
      <IslandMap coordinates={island.coordinates} />
    </div>
  );
}