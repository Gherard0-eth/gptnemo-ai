import { PirateChat } from "@/components/PirateChat";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Map, Compass, Skull, Ship } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-apple-gray-100 dark:bg-apple-gray-700 transition-colors duration-300">
      <div className="flex flex-col min-h-[calc(100vh-8rem)] pt-8">
        <main className="flex-1 px-4 sm:px-6 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 h-full">
            <div className="space-y-6 flex flex-col h-full">
              <div className="flex-shrink-0">
                <h1 className="text-3xl sm:text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100 mb-2">
                  Embark on an AI-Powered Treasure Hunt!
                </h1>
                <p className="text-sm sm:text-base text-apple-gray-500 dark:text-apple-gray-300">
                  Meet Sandokhan, your AI Pirate guide, and join treasure hunters worldwide in the quest for hidden riches. Bid for shovels, unlock exclusive hints, and discover treasures across mysterious islands.
                </p>
              </div>

              {/* Chat Box */}
              <div className="flex-1 min-h-[400px] w-full">
                <PirateChat />
              </div>

              {/* Treasure Islands Link Section */}
              <div 
                className="flex-shrink-0 p-4 sm:p-6 rounded-lg border border-apple-gray-200/20 dark:border-apple-gray-600/20 relative overflow-hidden group"
                style={{
                  backgroundImage: "url('/lovable-uploads/89c3491b-16e9-4b19-8004-9f5e66b901f5.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
                
                <div className="relative flex flex-col items-center text-center space-y-4">
                  <div className="flex gap-4 mb-2">
                    <Ship className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    <Compass className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    <Skull className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-display text-white mb-2">
                      Begin Your Adventure
                    </h2>
                    <p className="text-sm sm:text-base text-white/90 mb-4">
                      Explore our mystical islands where Sandokhan has hidden valuable treasures. Use your wit, follow the hints, and claim your rewards!
                    </p>
                  </div>
                  <Link to="/treasure-islands" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 font-display text-base sm:text-lg">
                      <Map className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Start Hunting
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            {isMobile ? (
              <div className="mt-6 pb-6">
                <RealTimeInfo />
              </div>
            ) : (
              <div className="hidden lg:block h-full overflow-y-auto">
                <RealTimeInfo />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;