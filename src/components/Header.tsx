import { Menu, Compass, Map, Skull, Wallet } from "lucide-react";
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
        {/* Mobile Menu */}
        <div className="md:hidden">
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

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <Compass className="h-8 w-8 text-apple-gray-700 dark:text-apple-gray-100" />
            <Map className="h-8 w-8 text-apple-gray-700 dark:text-apple-gray-100" />
            <Skull className="h-8 w-8 text-apple-gray-700 dark:text-apple-gray-100" />
          </div>
          <span className="font-display text-2xl text-apple-gray-700 dark:text-apple-gray-100">
            Epirates
          </span>
        </Link>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden md:flex items-center gap-2"
            onClick={handleConnectWallet}
          >
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        </div>
      </div>
    </header>
  );
};