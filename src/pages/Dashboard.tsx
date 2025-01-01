import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { DollarSign, TrendingUp, Map, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { toast } = useToast();
  const resetPrizePool = usePrizePoolStore((state) => state.resetPool);
  const resetLeaderboard = useLeaderboardStore((state) => state.resetEntries);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [totalInflow, setTotalInflow] = useState<number>(0);
  const [founderzInflow, setFounderzInflow] = useState<number>(0);
  const [islandInflows, setIslandInflows] = useState<{ [key: string]: number }>({});

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
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClearCache = () => {
    resetPrizePool();
    resetLeaderboard();
    setTotalInflow(0);
    setFounderzInflow(0);
    setIslandInflows({});
    toast({
      title: "Cache Cleared",
      description: "All data has been reset successfully.",
    });
  };

  const formatUSD = (eth: number) => {
    return (eth * ethPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button 
          variant="destructive"
          onClick={handleClearCache}
          className="gap-2"
        >
          Clear Cache
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Treasure Inflow
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInflow.toFixed(2)} ETH</div>
            <p className="text-xs text-muted-foreground">
              ≈ {formatUSD(totalInflow)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Founderz Inflow (10%)
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{founderzInflow.toFixed(2)} ETH</div>
            <p className="text-xs text-muted-foreground">
              ≈ {formatUSD(founderzInflow)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Island Inflow (5%)
            </CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(islandInflows).map(([island, amount]) => (
                <div key={island} className="flex justify-between items-center">
                  <span>Island {island}:</span>
                  <span className="font-medium">{amount.toFixed(2)} ETH</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}