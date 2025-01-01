import { useShovelStore } from "@/stores/useShovelStore";
import { Button } from "../ui/button";
import { Shovel } from "lucide-react";
import { useToast } from "../ui/use-toast";

export function ProjectInfo() {
  const { shovels, addShovels } = useShovelStore();
  const { toast } = useToast();

  const handleGetTestShovels = () => {
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
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleGetTestShovels}
      >
        Get Test Shovels
      </Button>
    </div>
  );
}