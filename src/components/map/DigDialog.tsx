import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shovel } from "lucide-react";
import { useShovelStore } from "@/stores/useShovelStore";
import { useToast } from "@/components/ui/use-toast";

interface DigDialogProps {
  selectedSquare: string | null;
  onOpenChange: (open: boolean) => void;
  onDig: (tileId: string) => void;
}

export function DigDialog({ selectedSquare, onOpenChange, onDig }: DigDialogProps) {
  const { shovels, useShovel } = useShovelStore();
  const { toast } = useToast();

  const handleDig = () => {
    if (selectedSquare) {
      if (useShovel()) {
        onDig(selectedSquare);
      } else {
        toast({
          title: "No Shovels!",
          description: "You need a shovel to dig. Get some test shovels from the home page!",
          variant: "destructive",
        });
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={!!selectedSquare} onOpenChange={onOpenChange}>
      <DialogContent className="apple-container max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-apple-gray-700 dark:text-apple-gray-100 text-center">
            Eyo hunter!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-6 py-4">
          <div className="flex items-center justify-center gap-2 text-apple-gray-500 dark:text-apple-gray-300">
            <Shovel className="h-5 w-5" />
            <span>You have {shovels} shovel{shovels !== 1 ? 's' : ''}</span>
          </div>
          <p className="apple-text text-lg">
            Do ya think the treasure is here? Wanna dig?
          </p>
          <Button
            className="apple-button w-full max-w-[200px] mx-auto group transition-all duration-300 
                     hover:transform hover:scale-105 active:scale-95"
            onClick={handleDig}
            disabled={shovels === 0}
          >
            <Shovel className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Dig Here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}