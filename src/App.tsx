import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { PrizePoolBanner } from "@/components/PrizePoolBanner";
import Index from "./pages/Index";
import TreasureIslands from "./pages/TreasureIslands";
import IslandDetails from "./pages/IslandDetails";
import IslandMapPage from "./pages/IslandMap";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-apple-gray-100 dark:bg-apple-gray-700 transition-colors duration-300">
            <div className="min-h-screen backdrop-blur-sm bg-white/30 dark:bg-black/30">
              <Header />
              <main className="flex flex-col">
                <div className="mt-16">
                  <PrizePoolBanner />
                </div>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/treasure-islands" element={<TreasureIslands />} />
                  <Route path="/island/:id" element={<IslandDetails />} />
                  <Route path="/island/:id/map" element={<IslandMapPage />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;