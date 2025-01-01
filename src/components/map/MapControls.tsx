import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
}

export function MapControls({ onZoomIn, onZoomOut, className }: MapControlsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomIn}
        className="w-10 h-10 rounded-full bg-white/80 hover:bg-white/90 dark:bg-apple-gray-600/80 dark:hover:bg-apple-gray-600/90 backdrop-blur-sm"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomOut}
        className="w-10 h-10 rounded-full bg-white/80 hover:bg-white/90 dark:bg-apple-gray-600/80 dark:hover:bg-apple-gray-600/90 backdrop-blur-sm"
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}