import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shovel } from "lucide-react";

interface DigDialogProps {
  selectedSquare: string | null;
  onOpenChange: (open: boolean) => void;
  onDig: (tileId: string) => void;
}

export function DigDialog({ selectedSquare, onOpenChange, onDig }: DigDialogProps) {
  const handleDig = () => {
    if (selectedSquare) {
      onDig(selectedSquare);
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
          <p className="apple-text text-lg">
            Do ya think the treasure is here? Wanna dig?
          </p>
          <Button
            className="apple-button w-full max-w-[200px] mx-auto group transition-all duration-300 
                     hover:transform hover:scale-105 active:scale-95"
            onClick={handleDig}
          >
            <Shovel className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Dig Here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}