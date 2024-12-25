import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Move } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function MapControls({ onZoomIn, onZoomOut }: MapControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2 z-10">
      <Button
        variant="secondary"
        size="icon"
        className="bg-white/80 dark:bg-pirate-navy/80 shadow-lg"
        onClick={onZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white/80 dark:bg-pirate-navy/80 shadow-lg"
        onClick={onZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white/80 dark:bg-pirate-navy/80 shadow-lg"
      >
        <Move className="h-4 w-4" />
      </Button>
    </div>
  );
}