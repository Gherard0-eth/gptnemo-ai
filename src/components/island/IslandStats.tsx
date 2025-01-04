import { Badge } from "@/components/ui/badge";
import { Cloud, Mountain, Skull } from "lucide-react";

interface IslandStatsProps {
  climate: string;
  terrain: string;
  dangerLevel: "Low" | "Medium" | "High";
}

export function IslandStats({ climate, terrain, dangerLevel }: IslandStatsProps) {
  const dangerColor = {
    Low: "bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400",
    Medium: "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-600 dark:text-yellow-400",
    High: "bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400",
  }[dangerLevel];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Badge
        variant="secondary"
        className="bg-gray-100/80 dark:bg-[#141c2b]/80 text-gray-700 dark:text-gray-200
                 border border-gray-200/50 dark:border-blue-900/50 
                 transition-colors px-3 py-2
                 flex items-center gap-2 justify-center shadow-sm"
      >
        <Cloud className="w-4 h-4" />
        <span>Climate: {climate}</span>
      </Badge>

      <Badge
        variant="secondary"
        className="bg-gray-100/80 dark:bg-[#141c2b]/80 text-gray-700 dark:text-gray-200
                 border border-gray-200/50 dark:border-blue-900/50 
                 transition-colors px-3 py-2
                 flex items-center gap-2 justify-center shadow-sm"
      >
        <Mountain className="w-4 h-4" />
        <span>Terrain: {terrain}</span>
      </Badge>

      <Badge
        variant="secondary"
        className={`${dangerColor} border border-current/25 transition-colors px-3 py-2
                 flex items-center gap-2 justify-center shadow-sm`}
      >
        <Skull className="w-4 h-4" />
        <span>Danger Level: {dangerLevel}</span>
      </Badge>
    </div>
  );
}