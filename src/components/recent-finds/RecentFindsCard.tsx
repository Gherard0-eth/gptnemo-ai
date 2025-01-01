import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecentFindEntry } from "./RecentFindEntry";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useEffect, useState } from "react";

interface Find {
  id: number;
  finder: string;
  island: string;
  worth: string;
  time: string;
  timestamp: Date;
}

export const RecentFindsCard = () => {
  const getTopHunters = useLeaderboardStore((state) => state.getTopHunters);
  const [recentFinds, setRecentFinds] = useState<Find[]>([]);
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (err) {
        console.error('Error fetching ETH price:', err);
      }
    };

    fetchEthPrice();
  }, []);

  useEffect(() => {
    const hunters = getTopHunters();
    const finds = hunters.map((hunter, index) => ({
      id: index + 1,
      finder: hunter.username,
      island: ["Skull's Haven", "Dragon's Lair", "Mermaid's Cove"][Math.floor(Math.random() * 3)],
      worth: `${hunter.worth.toFixed(1)} ETH`,
      time: 'Just now',
      timestamp: new Date()
    }));
    setRecentFinds(finds);
  }, [getTopHunters]);

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
            {recentFinds.map((find) => (
              <RecentFindEntry key={find.id} find={find} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};