import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuctionStore } from "@/stores/useAuctionStore";
import { useUserStore } from "@/stores/useUserStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { Timer, Gavel, Shovel } from "lucide-react";

const ShovelAuction = () => {
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  
  const { currentPrice, endTime, highestBidder, placeBid, isActive, startNewAuction } = useAuctionStore();
  const username = useUserStore((state) => state.username);
  const addShovels = useShovelStore((state) => state.addShovels);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Auction ended");
        if (isActive && highestBidder === username) {
          addShovels(1);
          toast({
            title: "Congratulations!",
            description: "You won the auction! A new shovel has been added to your inventory.",
          });
        }
        startNewAuction();
      } else {
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, highestBidder, username, addShovels, isActive, startNewAuction, toast]);

  const handleBid = () => {
    if (!username) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= currentPrice) {
      toast({
        title: "Invalid bid",
        description: "Bid must be higher than current price",
        variant: "destructive",
      });
      return;
    }

    placeBid(username, amount);
    toast({
      title: "Bid placed!",
      description: `You've placed a bid of ${amount} ETH`,
    });
    setBidAmount("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Gavel className="h-6 w-6 text-apple-accent" />
            Daily Shovel Auction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-apple-gray-100 dark:bg-apple-gray-600 rounded-lg">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-apple-accent" />
              <span className="font-medium">Time Left:</span>
            </div>
            <span className="text-xl font-bold">{timeLeft}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-apple-gray-100 dark:bg-apple-gray-600 rounded-lg">
            <div className="flex items-center gap-2">
              <Shovel className="h-5 w-5 text-apple-accent" />
              <span className="font-medium">Current Price:</span>
            </div>
            <span className="text-xl font-bold">{currentPrice.toFixed(3)} ETH</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-apple-gray-100 dark:bg-apple-gray-600 rounded-lg">
            <span className="font-medium">Highest Bidder:</span>
            <span className="font-bold">{highestBidder || "No bids yet"}</span>
          </div>

          <div className="flex gap-4">
            <Input
              type="number"
              step="0.001"
              min={currentPrice}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter bid amount in ETH"
              className="flex-1"
            />
            <Button onClick={handleBid} className="whitespace-nowrap">
              Place Bid
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShovelAuction;