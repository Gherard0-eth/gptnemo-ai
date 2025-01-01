import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useDashboardStore } from "@/stores/useDashboardStore";

export const TotalInflow = () => {
  const totalInflow = useDashboardStore((state) => state.totalInflow);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Treasure Inflow</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalInflow.toFixed(3)} ETH</div>
      </CardContent>
    </Card>
  );
};