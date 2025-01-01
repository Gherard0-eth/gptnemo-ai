import { useState } from "react";
import { useShovelStore } from "@/stores/useShovelStore";
import { useUserStore } from "@/stores/useUserStore";
import { Button } from "../ui/button";
import { Shovel } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";

export function ProjectInfo() {
  const { shovels, addShovels } = useShovelStore();
  const { username, setUsername, logout } = useUserStore();
  const { toast } = useToast();
  const [inputUsername, setInputUsername] = useState("");

  const handleLogin = () => {
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
      toast({
        title: "Welcome!",
        description: `Logged in as ${inputUsername.trim()}`,
      });
      setInputUsername("");
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
    toast({
      title: "Shovels Added!",
      description: "You received 5 test shovels.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Treasure Hunter Stats</h2>
        <div className="flex items-center gap-1">
          <Shovel className="h-4 w-4" />
          <span>{shovels}</span>
        </div>
      </div>
      
      {!username ? (
        <div className="space-y-2">
          <Input
            placeholder="Enter username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Logged in as: {username}
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGetTestShovels}
          >
            Get Test Shovels
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}