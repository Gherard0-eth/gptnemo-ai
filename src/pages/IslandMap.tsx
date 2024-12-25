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
    <div className="min-h-screen bg-apple-gray-100 dark:bg-apple-gray-700 p-4">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 text-apple-gray-700 dark:text-apple-gray-100"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        Back to Island Details
      </Button>
      
      <div className="h-[calc(100vh-8rem)] apple-container p-4">
        <IslandMap coordinates={island.coordinates} />
      </div>
    </div>
  );
}