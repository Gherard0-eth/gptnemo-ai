import { PirateChat } from "@/components/PirateChat";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, Twitter, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background dark:bg-pirate-navy transition-colors duration-300">
      {/* Mobile Menu Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="dark:border-pirate-gold/20">
              <Menu className="h-5 w-5 dark:text-pirate-gold" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-white dark:bg-pirate-navy/95 p-4 border-r border-border dark:border-pirate-gold/20">
            <MobileMenu />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white dark:bg-pirate-navy/50 p-4 border-r border-border dark:border-pirate-gold/20 h-screen overflow-y-auto">
        <DesktopMenu />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-4xl font-pirate text-pirate-navy dark:text-pirate-gold mb-2 animate-float">
                Welcome, Treasure Hunter!
              </h1>
              <p className="text-muted-foreground dark:text-pirate-gold/70">
                Chat with our AI Pirate guide and track real-time treasure hunting activity.
              </p>
            </div>

            {/* Chat section */}
            <div className="w-full">
              <PirateChat />
            </div>
          </div>

          {/* Real-time information sidebar */}
          <div className="hidden lg:block">
            <RealTimeInfo />
          </div>
        </div>
      </main>
    </div>
  );
};

// Shared menu content component
const MenuContent = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-pirate text-pirate-navy dark:text-pirate-gold">Treasure Hunt</h2>
      <ThemeToggle />
    </div>

    <p className="text-sm text-muted-foreground dark:text-pirate-gold/70">
      Explore 10,000 unique islands and hunt for cryptocurrency treasures in this Web3-powered adventure.
    </p>

    <div>
      <h3 className="font-pirate text-lg text-pirate-navy dark:text-pirate-gold mb-2">TL;DR</h3>
      <ul className="text-sm text-muted-foreground dark:text-pirate-gold/70 space-y-2">
        <li>• 10,000 unique islands to explore</li>
        <li>• AI Pirate guide with crypto-unlocked hints</li>
        <li>• Real treasure hunts with crypto rewards</li>
        <li>• Community-driven exploration</li>
      </ul>
    </div>

    <div className="pt-4 border-t border-border dark:border-pirate-gold/20">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild className="dark:border-pirate-gold/20 dark:text-pirate-gold/70 dark:hover:bg-pirate-gold/10">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-4 h-4" />
            Twitter
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild className="dark:border-pirate-gold/20 dark:text-pirate-gold/70 dark:hover:bg-pirate-gold/10">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </Button>
      </div>
    </div>

    <div className="pt-4">
      <Button className="w-full bg-pirate-gold hover:bg-pirate-gold/90 text-pirate-navy dark:text-pirate-navy font-pirate" asChild>
        <Link to="/treasure-islands">
          Start Hunting
        </Link>
      </Button>
    </div>
  </div>
);

// Mobile Menu Component
const MobileMenu = () => <MenuContent />;

// Desktop Menu Component
const DesktopMenu = () => <MenuContent />;

export default Index;