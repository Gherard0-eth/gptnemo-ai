import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useState, useEffect } from "react";

export const IslandInflows = () => {
  const islandInflows = useDashboardStore((state) => state.islandInflows);
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
    const interval = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatUSD = (eth: number) => {
    return (eth * ethPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Island Inflows (5%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(islandInflows).length === 0 ? (
            <p className="text-muted-foreground">No island inflows recorded yet.</p>
          ) : (
            Object.entries(islandInflows).map(([island, amount]) => (
              <div key={island} className="flex justify-between items-center">
                <span>Island {island}:</span>
                <div className="text-right">
                  <div className="font-medium">{amount.toFixed(4)} ETH</div>
                  <div className="text-xs text-muted-foreground">
                    ≈ {formatUSD(amount)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};