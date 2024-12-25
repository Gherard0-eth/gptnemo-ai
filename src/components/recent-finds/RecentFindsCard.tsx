import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecentFindEntry } from "./RecentFindEntry";

const mockRecentFinds = [
  { id: 1, finder: "Jack Sparrow", island: "Skull's Haven", worth: "2.3 ETH", time: "2h ago" },
  { id: 2, finder: "Anne Bonny", island: "Dragon's Lair", worth: "1.8 ETH", time: "3h ago" },
  { id: 3, finder: "Mary Read", island: "Mermaid's Cove", worth: "1.5 ETH", time: "5h ago" },
];

export const RecentFindsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-apple-accent" />
          Recent Finds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[160px] pr-4">
          <div className="space-y-4">
            {mockRecentFinds.map((find) => (
              <RecentFindEntry key={find.id} find={find} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};