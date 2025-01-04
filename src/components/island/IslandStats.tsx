import { Badge } from "@/components/ui/badge";
import { Cloud, Mountain, Skull } from "lucide-react";

interface IslandStatsProps {
  climate: string;
  terrain: string;
  dangerLevel: "Low" | "Medium" | "High";
}

export function IslandStats({ climate, terrain, dangerLevel }: IslandStatsProps) {
  const dangerColor = {
    Low: "bg-green-500/20 hover:bg-green-500/30 text-green-500",
    Medium: "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500",
    High: "bg-red-500/20 hover:bg-red-500/30 text-red-500",
  }[dangerLevel];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Badge
        variant="secondary"
        className="bg-apple-gray-100/10 hover:bg-apple-gray-100/20 text-apple-gray-100 
                 border border-apple-gray-100/10 transition-colors px-3 py-2
                 flex items-center gap-2 justify-center"
      >
        <Cloud className="w-4 h-4" />
        <span>Climate: {climate}</span>
      </Badge>

      <Badge
        variant="secondary"
        className="bg-apple-gray-100/10 hover:bg-apple-gray-100/20 text-apple-gray-100 
                 border border-apple-gray-100/10 transition-colors px-3 py-2
                 flex items-center gap-2 justify-center"
      >
        <Mountain className="w-4 h-4" />
        <span>Terrain: {terrain}</span>
      </Badge>

      <Badge
        variant="secondary"
        className={`${dangerColor} border border-current transition-colors px-3 py-2
                 flex items-center gap-2 justify-center`}
      >
        <Skull className="w-4 h-4" />
        <span>Danger Level: {dangerLevel}</span>
      </Badge>
    </div>
  );
}