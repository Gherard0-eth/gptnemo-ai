import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Coins } from "lucide-react";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useUserStore } from "@/stores/useUserStore";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useState, useEffect } from "react";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { LoadingScreen } from "@/components/LoadingScreen";

interface TreasureFoundDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRedeem: () => void;
  islandId?: string;
}

export function TreasureFoundDialog({
  isOpen,
  onOpenChange,
  onRedeem,
  islandId,
}: TreasureFoundDialogProps) {
  const addWin = useLeaderboardStore((state) => state.addWin);
  const username = useUserStore((state) => state.username);
  const { amount: prizePool, resetPool, setAmount } = usePrizePoolStore();
  const { addInflow } = useDashboardStore();
  const { generateNewTreasure } = useTreasureHunt();
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

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

    if (isOpen) {
      fetchEthPrice();
    }
  }, [isOpen]);

  const handleRedeem = () => {
    if (username && islandId) {
      // Calculate distributions
      const userAmount = prizePool * 0.7;  // 70% to user
      const founderzAmount = prizePool * 0.1;  // 10% to founders
      const islandAmount = prizePool * 0.05;  // 5% to island
      const nextPoolAmount = prizePool * 0.15;  // 15% to next pool

      // Important: Reset the pool first to ensure the header icon updates immediately
      resetPool();
      
      addWin(username, userAmount);
      addInflow(prizePool, islandId);
      setAmount(nextPoolAmount);
      
      // Start new game
      generateNewTreasure();
      
      onRedeem();
      
      // Show loading screen for 2 seconds before refresh
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const usdValue = (prizePool * ethPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="glass-popup">
          <DialogHeader>
            <DialogTitle className="text-4xl font-display text-gray-800 dark:text-gray-100 text-center flex items-center justify-center gap-4">
              <Trophy className="h-12 w-12 text-yellow-500 animate-bounce" />
              Congratulations!
              <Trophy className="h-12 w-12 text-yellow-500 animate-bounce" />
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-8 py-8">
            <p className="text-2xl text-gray-700 dark:text-gray-200">
              You've found the treasure!
            </p>
            <div className="card-gradient p-8 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" 
                   style={{ transform: 'skewX(-20deg)', backgroundSize: '200% 100%' }} />
              <p className="text-xl mb-2 text-gray-700 dark:text-gray-200">Your Prize:</p>
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-blue-500 dark:text-blue-400">
                <Coins className="h-8 w-8" />
                {prizePool.toFixed(3)} ETH
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                ≈ {usdValue}
              </p>
            </div>
            <Button
              className="w-full max-w-[300px] mx-auto group transition-all duration-300 
                       text-xl py-6 bg-blue-500 hover:bg-blue-600 text-white
                       hover:transform hover:scale-105 active:scale-95
                       shadow-lg shadow-blue-500/20"
              onClick={handleRedeem}
            >
              Redeem Prize
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}