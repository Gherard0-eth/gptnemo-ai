import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { DollarSign, TrendingUp, Map, Users, Shovel } from "lucide-react";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardStore {
  totalInflow: number;
  founderzInflow: number;
  islandInflows: { [key: string]: number };
  shovelRatio: number;
  addInflow: (amount: number, islandId?: string) => void;
  setShovelRatio: (ratio: number) => void;
  reset: () => void;
}

const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      totalInflow: 0,
      founderzInflow: 0,
      islandInflows: {},
      shovelRatio: 1,
      addInflow: (amount, islandId) => set((state) => ({
        totalInflow: state.totalInflow + amount,
        founderzInflow: state.founderzInflow + (amount * 0.1),
        islandInflows: islandId 
          ? {
              ...state.islandInflows,
              [islandId]: (state.islandInflows[islandId] || 0) + (amount * 0.05)
            }
          : state.islandInflows
      })),
      setShovelRatio: (ratio) => set({ shovelRatio: ratio }),
      reset: () => set({
        totalInflow: 0,
        founderzInflow: 0,
        islandInflows: {},
        shovelRatio: 1
      })
    }),
    {
      name: 'dashboard-storage'
    }
  )
);

export default function Dashboard() {
  const { toast } = useToast();
  const resetPrizePool = usePrizePoolStore((state) => state.resetPool);
  const resetLeaderboard = useLeaderboardStore((state) => state.resetEntries);
  const { totalInflow, founderzInflow, islandInflows, shovelRatio, reset: resetDashboard, setShovelRatio } = useDashboardStore();
  const resetShovels = useShovelStore((state) => state.reset);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [newRatio, setNewRatio] = useState<string>(shovelRatio.toString());

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
    resetDashboard();
    toast({
      title: "Cache Cleared",
      description: "All data has been reset successfully.",
    });
  };

  const handleResetShovels = () => {
    resetShovels();
    toast({
      title: "Shovels Reset",
      description: "Your shovel count has been reset to 0.",
    });
  };

  const handleUpdateRatio = () => {
    const ratio = parseFloat(newRatio);
    if (isNaN(ratio) || ratio <= 0) {
      toast({
        title: "Invalid Ratio",
        description: "Please enter a valid positive number.",
        variant: "destructive"
      });
      return;
    }
    setShovelRatio(ratio);
    toast({
      title: "Ratio Updated",
      description: `New shovel-ETH ratio set to ${ratio}.`,
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
        <div className="space-x-4">
          <Button 
            variant="outline"
            onClick={handleResetShovels}
            className="gap-2"
          >
            <Shovel className="h-4 w-4" />
            Reset Shovels
          </Button>
          <Button 
            variant="destructive"
            onClick={handleClearCache}
            className="gap-2"
          >
            Clear Cache
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Shovel-ETH Ratio Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={newRatio}
              onChange={(e) => setNewRatio(e.target.value)}
              placeholder="Enter new ratio"
              className="max-w-[200px]"
            />
            <Button onClick={handleUpdateRatio}>Update Ratio</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Current ratio: 1 ETH = {shovelRatio} shovels
          </p>
        </CardContent>
      </Card>

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