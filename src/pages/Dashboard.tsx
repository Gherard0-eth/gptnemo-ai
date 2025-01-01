import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { Shovel } from "lucide-react";
import { EthFaucet } from "@/components/dashboard/EthFaucet";
import { IslandInflows } from "@/components/dashboard/IslandInflows";
import { TotalInflow } from "@/components/dashboard/TotalInflow";
import { FounderzInflow } from "@/components/dashboard/FounderzInflow";
import { useDashboardStore } from "@/stores/useDashboardStore";

export default function Dashboard() {
  const { toast } = useToast();
  const resetPrizePool = usePrizePoolStore((state) => state.resetPool);
  const resetLeaderboard = useLeaderboardStore((state) => state.resetEntries);
  const resetDashboard = useDashboardStore((state) => state.reset);
  const resetShovels = useShovelStore((state) => state.reset);

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

      <EthFaucet />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalInflow />
        <FounderzInflow />
        <IslandInflows />
      </div>
    </div>
  );
}