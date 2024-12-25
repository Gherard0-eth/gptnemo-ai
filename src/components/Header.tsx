import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuContent } from "./MenuContent";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-pirate-navy/95 border-b border-pirate-gold/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="dark:text-pirate-gold">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-white dark:bg-pirate-navy/95 p-4">
              <MenuContent />
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/placeholder.svg" alt="Epirates Logo" className="h-8 w-8" />
          <span className="font-pirate text-2xl text-pirate-navy dark:text-pirate-gold">
            Epirates
          </span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};