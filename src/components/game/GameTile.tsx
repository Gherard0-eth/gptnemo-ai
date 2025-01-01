import { Shovel } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameTileProps {
  isDug: boolean;
  isTreasure: boolean;
  onClick: () => void;
}

export function GameTile({ isDug, isTreasure, onClick }: GameTileProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDug}
      className={cn(
        "w-11 h-11 border border-apple-gray-200/20 dark:border-apple-gray-600/20",
        "transition-all duration-200 hover:bg-apple-gray-200/50 dark:hover:bg-apple-gray-600/50",
        "disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-apple-accent",
        isDug && "bg-apple-gray-200 dark:bg-apple-gray-600",
        isTreasure && isDug && "bg-amber-200 dark:bg-amber-700"
      )}
    >
      {isDug && !isTreasure && (
        <Shovel className="w-6 h-6 mx-auto text-apple-gray-400 dark:text-apple-gray-300" />
      )}
      {isDug && isTreasure && (
        <span className="text-2xl">💎</span>
      )}
    </button>
  );
}