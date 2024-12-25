import { Coins } from "lucide-react";

export const PrizePoolBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-emerald-50 border-y border-emerald-200/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-2 text-emerald-800">
        <div className="flex items-center gap-2 group">
          <Coins className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
          <span className="font-pirate text-base sm:text-lg">Current Prize Pool:</span>
          <span className="font-bold text-base sm:text-lg">1,000 ETH</span>
        </div>
      </div>
    </div>
  );
};