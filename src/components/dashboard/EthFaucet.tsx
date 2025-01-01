import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DollarSign } from "lucide-react";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useToast } from "@/components/ui/use-toast";

export const EthFaucet = () => {
  const [amount, setAmount] = useState("0.01");
  const addShovels = useShovelStore((state) => state.addShovels);
  const { addAmount } = usePrizePoolStore();
  const { toast } = useToast();

  const handleGetShovels = () => {
    const ethAmount = parseFloat(amount);
    if (isNaN(ethAmount) || ethAmount < 0.001) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount (minimum 0.001 ETH)",
        variant: "destructive"
      });
      return;
    }

    // Add the selected amount to prize pool and give 1 shovel
    addAmount(ethAmount);
    addShovels(1);
    
    toast({
      title: "Success!",
      description: `Added 1 test shovel and ${ethAmount} ETH to the prize pool`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ETH Faucet</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.001"
            min="0.001"
            className="max-w-[200px]"
          />
          <span>ETH</span>
        </div>
        <Button onClick={handleGetShovels} className="w-full">
          Get Test Shovels
        </Button>
      </CardContent>
    </Card>
  );
}