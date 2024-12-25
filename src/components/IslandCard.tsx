import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, MapPin, Skull, Mountain, Cloud, Anchor, Ghost } from "lucide-react";
import { Link } from "react-router-dom";

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

  // Map characteristics to their respective icons
  const characteristics = [
    {
      type: "climate",
      icon: <Cloud className="w-4 h-4" />,
      label: climate,
    },
    {
      type: "terrain",
      icon: <Mountain className="w-4 h-4" />,
      label: terrain,
    },
    {
      type: "water",
      icon: <Anchor className="w-4 h-4" />,
      label: "Cursed Waters",
    },
    {
      type: "ships",
      icon: <Ghost className="w-4 h-4" />,
      label: "Ghost Ships",
    },
  ];

  return (
    <Link to={`/island/${id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm">
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display text-white">{name}</h3>
            <span className="text-sm text-white/70">#{id}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {characteristics.map((char, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors px-3 py-1.5"
              >
                {char.icon}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}