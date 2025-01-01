import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useDashboardStore } from "@/stores/useDashboardStore";

export const FounderzInflow = () => {
  const founderzInflow = useDashboardStore((state) => state.founderzInflow);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Founderz Inflow (10%)</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{founderzInflow.toFixed(3)} ETH</div>
      </CardContent>
    </Card>
  );
};