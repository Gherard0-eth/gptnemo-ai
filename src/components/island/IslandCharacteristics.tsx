import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface Characteristic {
  label: string;
  icon: LucideIcon;
}

interface IslandCharacteristicsProps {
  characteristics: Characteristic[];
}

export function IslandCharacteristics({ characteristics }: IslandCharacteristicsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {characteristics.map((char, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="bg-apple-gray-700/40 hover:bg-apple-gray-700/60 text-apple-gray-100 
                   border-none transition-colors px-3 py-1.5 
                   flex items-center gap-2 rounded-full"
        >
          <char.icon className="w-4 h-4" />
          <span>{char.label}</span>
        </Badge>
      ))}
    </div>
  );
}