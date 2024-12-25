import { Coins } from "lucide-react";

export const PrizePoolBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-apple-accent/10 via-apple-accent/5 to-apple-accent/10 border-y border-apple-accent/20">
      <div 
        className="container mx-auto px-4 py-3 flex items-center justify-center gap-2 text-apple-accent animate-pulse"
      >
        <div className="flex items-center gap-2 group">
          <Coins className="h-5 w-5 text-apple-accent group-hover:text-apple-accent/90 transition-colors" />
          <span className="font-display text-base sm:text-lg">Current Prize Pool:</span>
          <span className="font-bold text-base sm:text-lg">1,000 ETH</span>
        </div>
      </div>
    </div>
  );
};