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
}

export function DigDialog({ selectedSquare, onOpenChange }: DigDialogProps) {
  return (
    <Dialog open={!!selectedSquare} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/95 dark:bg-pirate-navy border-pirate-gold/20">
        <DialogHeader>
          <DialogTitle className="font-pirate text-2xl text-pirate-navy dark:text-pirate-gold">
            Eyo hunter!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground dark:text-pirate-gold/70">
            Do ya think the treasure is here? Wanna dig?
          </p>
          <Button
            className="bg-pirate-gold hover:bg-pirate-gold/90 text-pirate-navy font-pirate text-lg"
            onClick={() => console.log(`Digging at square ${selectedSquare}`)}
          >
            <Shovel className="mr-2 h-5 w-5" />
            Dig Here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}