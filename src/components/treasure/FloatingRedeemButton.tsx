import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface FloatingRedeemButtonProps {
  onClick: () => void;
}

export function FloatingRedeemButton({ onClick }: FloatingRedeemButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white dark:bg-black shadow-xl 
                hover:scale-110 transition-transform duration-200 border-2 border-apple-accent"
      onClick={onClick}
    >
      <Coins className="h-8 w-8 text-apple-accent animate-pulse" />
    </Button>
  );
}