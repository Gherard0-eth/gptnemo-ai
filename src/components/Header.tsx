import { Menu, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuContent } from "./MenuContent";
import { useToast } from "./ui/use-toast";

export const Header = () => {
  const { toast } = useToast();

  const handleConnectWallet = () => {
    toast({
      title: "Coming Soon",
      description: "Wallet connection functionality will be available soon!",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-apple-gray-700/95 border-b border-apple-gray-200/20 dark:border-apple-gray-600/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Menu Button (Both Mobile and Desktop) */}
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

        {/* Logo - Now centered */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="flex items-center">
            <span className="font-display text-2xl text-apple-gray-700 dark:text-apple-gray-100">
              Epirates
            </span>
          </Link>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
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
    </header>
  );
};