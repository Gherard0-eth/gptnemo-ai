import { Compass } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Compass className="w-16 h-16 text-apple-accent animate-spin mx-auto" />
        <p className="text-white text-xl font-display animate-pulse">
          The pirate is searching for another treasure...
        </p>
      </div>
    </div>
  );
}