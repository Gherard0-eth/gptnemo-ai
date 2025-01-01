import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { Map } from "lucide-react";
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Island Inflows (5%)</CardTitle>
        <Map className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(islandInflows).length > 0 ? (
            Object.entries(islandInflows).map(([island, amount]) => (
              <div key={island} className="flex justify-between items-center">
                <span>Island {island}:</span>
                <div className="text-right">
                  <div className="font-medium">{amount.toFixed(3)} ETH</div>
                  <div className="text-xs text-muted-foreground">
                    {formatUSD(amount)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No island inflows recorded yet</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};