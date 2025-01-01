import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useEffect, useState } from "react";

export const PrizePoolCard = () => {
  const amount = usePrizePoolStore((state) => state.amount);
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setEthPrice(data.ethereum.usd);
      })
      .catch(err => console.error('Error fetching ETH price:', err));
  }, []);

  const usdValue = (amount * ethPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-apple-accent" />
          Current Prize Pool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-apple-accent">{amount.toFixed(1)} ETH</div>
        <p className="text-sm text-muted-foreground">≈ {usdValue}</p>
      </CardContent>
    </Card>
  );
};