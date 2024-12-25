import { PirateChat } from "@/components/PirateChat";
import { RealTimeInfo } from "@/components/RealTimeInfo";
import { Header } from "@/components/Header";
import { MenuContent } from "@/components/MenuContent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-pirate-navy transition-colors duration-300">
      <Header />
      
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/95 dark:bg-pirate-navy/50 p-4 border-r border-pirate-gold/20 overflow-y-auto">
          <MenuContent />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-64">
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

              <div className="w-full">
                <PirateChat />
              </div>
            </div>

            <div className="hidden lg:block">
              <RealTimeInfo />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;