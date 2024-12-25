import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const WalletButton = () => {
  const { toast } = useToast();

  const handleConnectWallet = () => {
    toast({
      title: "Coming Soon",
      description: "Wallet connection functionality will be available soon!",
    });
  };

  return (
    <div className="space-y-4">
      <Button variant="outline" className="w-full" onClick={handleConnectWallet}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    </div>
  );
};