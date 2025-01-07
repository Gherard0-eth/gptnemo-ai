import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { WagmiProvider } from 'wagmi';
import { Web3AuthProvider } from "./providers/Web3AuthProvider";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import TreasureIslands from "./pages/TreasureIslands";
import IslandDetails from "./pages/IslandDetails";
import IslandMapPage from "./pages/IslandMap";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Documentation from "./pages/Documentation";
import ShovelAuction from "./pages/ShovelAuction";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <WagmiProvider config={config}>
    <Web3AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/">
              <div className="min-h-screen bg-apple-gray-100 dark:bg-apple-gray-700 transition-colors duration-300">
                <div className="min-h-screen backdrop-blur-sm bg-white/30 dark:bg-black/30">
                  <Header />
                  <main className="flex flex-col md:h-screen md:overflow-hidden">
                    <div className="mt-16 h-full overflow-y-auto md:overflow-hidden">
                      <div className="h-full overflow-y-auto">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/treasure-islands" element={<TreasureIslands />} />
                          <Route path="/island/:id" element={<IslandDetails />} />
                          <Route path="/island/:id/map" element={<IslandMapPage />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/docs" element={<Documentation />} />
                          <Route path="/auction" element={<ShovelAuction />} />
                        </Routes>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  </WagmiProvider>
);

export default App;