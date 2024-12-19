import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, MapPin, Skull } from "lucide-react";

interface IslandCardProps {
  id: string;
  name: string;
  climate: string;
  terrain: string;
  dangerLevel: "Low" | "Medium" | "High";
  imageUrl: string;
}

export function IslandCard({ id, name, climate, terrain, dangerLevel, imageUrl }: IslandCardProps) {
  const dangerColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  }[dangerLevel];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className={`${dangerColor} text-white`}>
              <Skull className="w-3 h-3 mr-1" />
              {dangerLevel}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-pirate text-pirate-navy">{name}</h3>
          <span className="text-sm text-muted-foreground">#{id}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Compass className="w-4 h-4 mr-1" />
            {climate}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {terrain}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}