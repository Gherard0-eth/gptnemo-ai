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
      // Calculate distributions based on contract constants
      const userAmount = prizePool * 0.7;  // WINNER_SHARE = 70%
      const founderzAmount = prizePool * 0.1;  // FOUNDERS_SHARE = 10%
      const nextPoolAmount = prizePool * 0.3;  // NEXT_GAME_SHARE = 30%

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
        <DialogContent className="apple-container max-w-2xl mx-auto">
          <DialogHeader>
            <DialogTitle className="text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100 text-center flex items-center justify-center gap-4">
              <Trophy className="h-12 w-12 text-yellow-500 animate-bounce" />
              Congratulations!
              <Trophy className="h-12 w-12 text-yellow-500 animate-bounce" />
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-8 py-8">
            <p className="apple-text text-2xl">
              You've found the treasure!
            </p>
            <div className="bg-apple-gray-100 dark:bg-apple-gray-600 p-8 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2s_infinite]" 
                   style={{ transform: 'skewX(-20deg)', backgroundSize: '200% 100%' }} />
              <p className="text-xl mb-2">Your Prize:</p>
              <div className="flex items-center justify-center gap-2 text-3xl font-bold text-apple-accent">
                <Coins className="h-8 w-8" />
                {(prizePool * 0.7).toFixed(3)} ETH
              </div>
              <p className="text-sm text-apple-gray-500 dark:text-apple-gray-300 mt-2">
                ≈ {usdValue}
              </p>
            </div>
            <Button
              className="apple-button w-full max-w-[300px] mx-auto group transition-all duration-300 
                       text-xl py-6 hover:transform hover:scale-105 active:scale-95"
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