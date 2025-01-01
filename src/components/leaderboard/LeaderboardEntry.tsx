import { useEffect, useState } from "react";

interface Hunter {
  id: number;
  name: string;
  finds: number;
  worth: string;
}

interface LeaderboardEntryProps {
  hunter: Hunter;
  position: number;
}

const getPositionEmoji = (position: number) => {
  switch (position) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
};

export const LeaderboardEntry = ({ hunter, position }: LeaderboardEntryProps) => {
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setEthPrice(data.ethereum.usd);
      })
      .catch(err => console.error('Error fetching ETH price:', err));
  }, []);

  const worthInEth = parseFloat(hunter.worth);
  const usdValue = (worthInEth * ethPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="font-medium">{hunter.name}</div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">#{position}</span>
          <span>{getPositionEmoji(position)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{hunter.finds} finds</span>
        <div className="text-right">
          <div className="text-apple-accent font-medium">{hunter.worth}</div>
          <div className="text-xs text-muted-foreground">{usdValue}</div>
        </div>
      </div>
    </div>
  );
};