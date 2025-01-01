import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLeaderboardStore } from "@/stores/useLeaderboardStore";
import { useUserStore } from "@/stores/useUserStore";

interface TreasureFoundDialogProps {
  isOpen: boolean;
  onClose: () => void;
  prizeAmount: string;
  onRedeem: () => void;
}

export function TreasureFoundDialog({
  isOpen,
  onClose,
  prizeAmount,
  onRedeem,
}: TreasureFoundDialogProps) {
  const addWin = useLeaderboardStore((state) => state.addWin);
  const username = useUserStore((state) => state.username);

  const handleRedeem = () => {
    if (username) {
      addWin(username, prizeAmount);
    }
    onRedeem();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-4 py-4">
          <h2 className="text-2xl font-bold">🎉 Treasure Found! 🎉</h2>
          <p className="text-lg">
            Congratulations! You've discovered treasure worth:
          </p>
          <p className="text-3xl font-bold text-apple-accent">{prizeAmount}</p>
          <Button onClick={handleRedeem} className="w-full">
            Redeem Prize
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}