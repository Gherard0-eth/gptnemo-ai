import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useEffect, useState } from "react";

export const PrizePoolCard = () => {
  const amount = usePrizePoolStore((state) => state.amount);
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
        const data = await response.json();
        setEthPrice(data.USD);
      } catch (err) {
        console.error('Error fetching ETH price:', err);
      }
    };

    fetchEthPrice();
    // Refresh price every minute
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
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