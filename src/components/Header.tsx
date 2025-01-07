import { Menu, Wallet, Shovel } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuContent } from "./MenuContent";
import { useToast } from "./ui/use-toast";
import { useShovelStore } from "@/stores/useShovelStore";
import { useWeb3Auth } from "@/providers/Web3AuthProvider";

export const Header = () => {
  const { toast } = useToast();
  const shovels = useShovelStore((state) => state.shovels);
  const { address, isConnected, connect, disconnect } = useWeb3Auth();

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "You've been successfully logged out.",
      });
    } else {
      connect();
    }
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
            <span className="font-logo text-xl md:text-2xl">
              <span className="text-[#0EA5E9]">GPT</span>
              <span className="text-apple-gray-700 dark:text-apple-gray-100">Nemo</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center mr-2">
            <Shovel className="h-4 w-4 text-apple-gray-700 dark:text-apple-gray-100" />
            <span className="ml-1 text-sm font-medium text-apple-gray-700 dark:text-apple-gray-100">
              {shovels}
            </span>
          </div>
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="text-apple-gray-700 dark:text-apple-gray-100"
            >
              <Wallet className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2"
            onClick={handleConnectWallet}
          >
            <span>{isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}