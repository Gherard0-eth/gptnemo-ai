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

interface TreasureFoundDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRedeem: () => void;
}

export function TreasureFoundDialog({
  isOpen,
  onOpenChange,
  onRedeem,
}: TreasureFoundDialogProps) {
  const addWin = useLeaderboardStore((state) => state.addWin);
  const username = useUserStore((state) => state.username);
  const { amount: prizePool, resetPool } = usePrizePoolStore();

  const handleRedeem = () => {
    if (username) {
      addWin(username, prizePool);
      resetPool();
      onRedeem();
    }
  };

  return (
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
          <div className="bg-apple-gray-100 dark:bg-apple-gray-600 p-8 rounded-xl">
            <p className="text-xl mb-2">Your Prize:</p>
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-apple-accent">
              <Coins className="h-8 w-8" />
              {prizePool.toFixed(1)} ETH
            </div>
            <p className="text-sm text-apple-gray-500 dark:text-apple-gray-300 mt-2">
              ≈ ${(prizePool * 2150).toLocaleString()} USD
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
  );
}