import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { TotalInflow } from "@/components/dashboard/TotalInflow";
import { FounderzInflow } from "@/components/dashboard/FounderzInflow";
import { IslandInflows } from "@/components/dashboard/IslandInflows";
import { EthFaucet } from "@/components/dashboard/EthFaucet";

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
    resetShovels();
    toast({
      title: "Cache Cleared",
      description: "All data has been reset successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button 
          variant="destructive"
          onClick={handleClearCache}
        >
          Clear Cache
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalInflow />
        <FounderzInflow />
        <EthFaucet />
      </div>

      <div className="mt-6">
        <IslandInflows />
      </div>
    </div>
  );
}