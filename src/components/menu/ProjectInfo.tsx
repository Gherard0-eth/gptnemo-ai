import { useShovelStore } from "@/stores/useShovelStore";
import { useUserStore } from "@/stores/useUserStore";
import { usePrizePoolStore } from "@/stores/usePrizePoolStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Shovel } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

export function ProjectInfo() {
  const { shovels, addShovels } = useShovelStore();
  const { username, setUsername } = useUserStore();
  const { addAmount } = usePrizePoolStore();
  const { toast } = useToast();
  const [newUsername, setNewUsername] = useState("");

  const handleLogin = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      toast({
        title: "Welcome aboard!",
        description: `You're now logged in as ${newUsername}`,
      });
      setNewUsername("");
    }
  };

  const handleGetTestShovels = () => {
    if (!username) {
      toast({
        title: "Login Required",
        description: "Please login to get test shovels.",
        variant: "destructive",
      });
      return;
    }
    addShovels(5);
    addAmount(10);
    toast({
      title: "Shovels Added!",
      description: "You received 5 test shovels and added 10 ETH to the prize pool!",
    });
  };

  return (
    <div className="space-y-4">
      {!username ? (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Login to Hunt Treasures</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Enter username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Welcome, {username}!</h2>
            <div className="flex items-center gap-1">
              <Shovel className="h-4 w-4" />
              <span>{shovels}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGetTestShovels}
          >
            Get Test Shovels
          </Button>
        </div>
      )}
    </div>
  );
}