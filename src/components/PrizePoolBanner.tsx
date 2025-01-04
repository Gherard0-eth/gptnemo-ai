import { Coins } from "lucide-react";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";

export const PrizePoolBanner = () => {
  const prizePool = usePrizePoolStore((state) => state.amount);

  return (
    <div className="w-full bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 border-y border-emerald-500/20">
      <div 
        className="container mx-auto px-4 py-3 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 animate-pulse"
      >
        <div className="flex items-center gap-2 group">
          <Coins className="h-5 w-5 group-hover:text-emerald-500 transition-colors" />
          <span className="font-display text-base sm:text-lg">Current Treasury Pool:</span>
          <span className="font-bold text-base sm:text-lg">{prizePool.toFixed(3)} ETH</span>
        </div>
      </div>
    </div>
  );
};