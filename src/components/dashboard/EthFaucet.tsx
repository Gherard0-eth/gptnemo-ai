import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useShovelStore } from "@/stores/useShovelStore";
import { useDashboardStore } from "@/stores/useDashboardStore";

export const EthFaucet = () => {
  const { toast } = useToast();
  const addShovels = useShovelStore((state) => state.addShovels);
  const [ethAmount, setEthAmount] = useState("0.001");
  const shovelRatio = useDashboardStore((state) => state.shovelRatio);

  const handleEthAmountChange = (value: string) => {
    // Ensure the value is a valid number and >= 0.001
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0.001) {
      setEthAmount(value);
    }
  };

  const handleGetShovels = () => {
    const amount = parseFloat(ethAmount);
    if (!isNaN(amount) && amount >= 0.001) {
      const shovelsToAdd = Math.floor(amount * shovelRatio);
      addShovels(shovelsToAdd);
      toast({
        title: "Shovels Added!",
        description: `You received ${shovelsToAdd} shovels for ${amount} ETH`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ETH Faucet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={ethAmount}
            onChange={(e) => handleEthAmountChange(e.target.value)}
            step="0.001"
            min="0.001"
            className="max-w-[200px]"
          />
          <Button onClick={handleGetShovels}>Get Test Shovels</Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Current ratio: {shovelRatio} shovels per ETH
        </p>
      </CardContent>
    </Card>
  );
};