import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuctionStore } from "@/stores/useAuctionStore";
import { useShovelStore } from "@/stores/useShovelStore";
import { Timer, Gavel, Shovel, ArrowLeft, History } from "lucide-react";
import { Link } from "react-router-dom";

const ShovelAuction = () => {
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  
  const { currentPrice, endTime, highestBidder, placeBid, isActive, bids, startNewAuction } = useAuctionStore();
  const username = "TestUser"; // This will be replaced with actual Web3 wallet address

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Auction ended");
        if (isActive && highestBidder === username) {
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
  }, [endTime, highestBidder, username, isActive, startNewAuction, toast]);

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
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

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
            <span className="text-xl font-bold">{currentPrice} ETH</span>
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

          {/* Bid History Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-apple-accent" />
              <h3 className="text-lg font-semibold">Bid History</h3>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {bids.slice().reverse().map((bid, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-apple-gray-100 dark:bg-apple-gray-600 rounded-lg"
                >
                  <span className="font-medium">{bid.username}</span>
                  <span className="text-sm">{bid.amount} ETH</span>
                </div>
              ))}
              {bids.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No bids yet</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShovelAuction;