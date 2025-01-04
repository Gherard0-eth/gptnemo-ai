import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuctionStore } from "@/stores/useAuctionStore";
import { Timer, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const AuctionStatus = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const { currentPrice, endTime, highestBidder, startNewAuction } = useAuctionStore();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Starting new auction...");
        startNewAuction();
        toast({
          title: "New Auction Started",
          description: "A new shovel auction has begun!",
        });
      } else {
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);

        // Show warning when less than 1 minute remains
        if (diff <= 60000 && diff > 59000) {
          toast({
            title: "Last Minute!",
            description: "Bids now extend the auction by 30 seconds!",
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, startNewAuction, toast]);

  return (
    <Card className="bg-neutral-800/90 dark:bg-neutral-800/90">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Timer className="h-5 w-5 text-apple-accent" />
          Daily Shovel Auction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Price:</span>
            <span className="font-bold">{currentPrice.toFixed(3)} ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Time Left:</span>
            <span className="font-bold">{timeLeft}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Highest Bidder:</span>
            <span className="font-bold">{highestBidder || "No bids yet"}</span>
          </div>
          <Link to="/auction" className="mt-2">
            <Button variant="outline" className="w-full">
              Place Bid
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};