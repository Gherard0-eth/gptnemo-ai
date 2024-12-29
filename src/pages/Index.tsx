import { PirateChat } from "@/components/PirateChat";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { MenuContent } from "@/components/MenuContent";
import { Button } from "@/components/ui/button";
import { Map, Compass, Skull, Ship } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-apple-gray-100 dark:bg-apple-gray-700 transition-colors duration-300">
      <div className="flex h-[calc(100vh-4rem)] pt-4">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-24 h-[calc(100vh-6rem)] apple-container mx-4 overflow-y-auto">
          <MenuContent />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-6 md:ml-72 h-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 h-full">
            <div className="space-y-6 flex flex-col h-full">
              <div className="flex-shrink-0">
                <h1 className="text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
                  Welcome, Treasure Hunter!
                </h1>
                <p className="text-apple-gray-500 dark:text-apple-gray-300">
                  Chat with our AI Pirate guide and track real-time treasure hunting activity.
                </p>
              </div>

              {/* Chat Box */}
              <div className="flex-1 min-h-0 w-full">
                <PirateChat />
              </div>

              {/* Treasure Islands Link Section */}
              <div 
                className="flex-shrink-0 p-6 rounded-lg border border-apple-gray-200/20 dark:border-apple-gray-600/20 relative overflow-hidden group mb-4"
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
                    <Ship className="h-6 w-6 text-white" />
                    <Compass className="h-6 w-6 text-white" />
                    <Skull className="h-6 w-6 text-white" />
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
            </div>

            {/* Leaderboard - Desktop */}
            <div className="hidden lg:block h-full overflow-y-auto pr-4">
              <RealTimeInfo />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;