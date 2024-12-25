import { PirateChat } from "@/components/PirateChat";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { Header } from "@/components/Header";
import { MenuContent } from "@/components/MenuContent";
import { Button } from "@/components/ui/button";
import { Map, Compass, Skull, Ship } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-pirate-navy transition-colors duration-300">
      <div className="flex pt-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-32 h-[calc(100vh-8rem)] bg-white/95 dark:bg-pirate-navy/50 p-4 border-r border-pirate-gold/20 overflow-y-auto">
          <MenuContent />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-6">
              <div className="mb-6">
                <h1 className="text-4xl font-display text-pirate-navy dark:text-pirate-gold mb-2">
                  Welcome, Treasure Hunter!
                </h1>
                <p className="text-muted-foreground dark:text-pirate-gold/70">
                  Chat with our AI Pirate guide and track real-time treasure hunting activity.
                </p>
              </div>

              {/* Treasure Islands Link Section */}
              <div 
                className="p-6 rounded-lg border border-pirate-gold/20 relative overflow-hidden group"
                style={{
                  backgroundImage: "url('/lovable-uploads/89c3491b-16e9-4b19-8004-9f5e66b901f5.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
                
                <div className="relative flex flex-col items-center text-center space-y-4">
                  <div className="flex gap-4 mb-2">
                    <Ship className="h-6 w-6 text-white animate-float" />
                    <Compass className="h-6 w-6 text-white animate-float" />
                    <Skull className="h-6 w-6 text-white animate-float" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display text-white mb-2">
                      Explore Treasure Islands
                    </h2>
                    <p className="text-white/90 mb-4">
                      Discover mysterious islands and hunt for hidden treasures in our vast ocean of opportunities
                    </p>
                  </div>
                  <Link to="/treasure-islands" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 font-display text-lg">
                      <Map className="mr-2 h-5 w-5" />
                      View Islands
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="w-full">
                <PirateChat />
              </div>
            </div>

            {/* Leaderboard - Desktop */}
            <div className="hidden lg:block">
              <RealTimeInfo />
            </div>
          </div>

          {/* Leaderboard - Mobile */}
          <div className="mt-6 lg:hidden">
            <RealTimeInfo />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;