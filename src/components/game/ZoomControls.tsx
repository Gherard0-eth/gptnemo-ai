import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function ZoomControls({ scale, onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="apple-container p-2 space-y-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        disabled={scale >= 2}
      >
        <Plus className="h-4 w-4" />
      </Button>
      
      <div className="text-xs font-medium text-apple-gray-500 dark:text-apple-gray-400">
        {Math.round(scale * 100)}%
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        disabled={scale <= 0.2}
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}