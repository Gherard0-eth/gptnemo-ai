import { Menu, Wallet, Shovel, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuContent } from "./MenuContent";
import { useToast } from "./ui/use-toast";
import { useShovelStore } from "@/stores/useShovelStore";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { useState } from "react";
import { TreasureFoundDialog } from "./treasure/TreasureFoundDialog";

export const Header = () => {
  const { toast } = useToast();
  const shovels = useShovelStore((state) => state.shovels);
  const [showTreasureDialog, setShowTreasureDialog] = useState(false);
  const hasUnredeemedTreasure = usePrizePoolStore((state) => state.amount > 0);

  const handleConnectWallet = () => {
    toast({
      title: "Coming Soon",
      description: "Wallet connection functionality will be available soon!",
    });
  };

  const handleRedeem = () => {
    setShowTreasureDialog(false);
    toast({
      title: "Prize Redeemed! 🎉",
      description: "Your treasure has been successfully claimed!",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-apple-gray-700/95 border-b border-apple-gray-200/20 dark:border-apple-gray-600/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-apple-gray-700 dark:text-apple-gray-100">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] apple-container">
              <MenuContent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center">
            <span className="font-display text-2xl text-apple-gray-700 dark:text-apple-gray-100">
              Epirates
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {hasUnredeemedTreasure && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTreasureDialog(true)}
              className="relative animate-pulse"
            >
              <Coins className="h-6 w-6 text-apple-accent" 
                     style={{ 
                       filter: 'drop-shadow(0 0 4px currentColor)',
                       strokeWidth: 2.5 
                     }}
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          )}
          <div className="flex items-center gap-1 mr-2 text-apple-gray-700 dark:text-apple-gray-100">
            <Shovel className="h-4 w-4" />
            <span>{shovels}</span>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleConnectWallet}
          >
            <Wallet className="h-4 w-4" />
            <span className="hidden md:inline">Connect Wallet</span>
          </Button>
        </div>
      </div>

      <TreasureFoundDialog
        isOpen={showTreasureDialog}
        onOpenChange={setShowTreasureDialog}
        onRedeem={handleRedeem}
      />
    </header>
  );
};