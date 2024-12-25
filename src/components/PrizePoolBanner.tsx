import { Coins } from "lucide-react";

export const PrizePoolBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-pirate-gold/20 via-pirate-gold/10 to-pirate-gold/20 border-y border-pirate-gold/10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-pirate-navy dark:text-pirate-gold">
        <Coins className="h-5 w-5" />
        <span className="font-pirate">Current Prize Pool:</span>
        <span className="font-bold">1,000 ETH</span>
      </div>
    </div>
  );
};