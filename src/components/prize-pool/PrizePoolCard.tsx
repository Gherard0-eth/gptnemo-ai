import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PrizePoolCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-apple-accent" />
          Current Prize Pool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-apple-accent">45.8 ETH</div>
        <p className="text-sm text-muted-foreground">≈ $98,750 USD</p>
      </CardContent>
    </Card>
  );
};