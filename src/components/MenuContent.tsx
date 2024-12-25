import { useState } from "react";
import { Github, Twitter, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ThemeToggle } from "./ThemeToggle";
import { useToast } from "./ui/use-toast";

export const MenuContent = () => {
  const [isProjectInfoOpen, setProjectInfoOpen] = useState(false);
  const [isTldrOpen, setTldrOpen] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    toast({
      title: "Coming Soon",
      description: "Wallet connection functionality will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">
          Project Info
        </h2>
        <div className="space-y-4">
          <Collapsible open={isProjectInfoOpen} onOpenChange={setProjectInfoOpen}>
            <div className="text-sm text-muted-foreground">
              <p>
                Welcome to Epirates, where blockchain meets adventure! Our platform transforms
                treasure hunting into an exciting Web3 experience.
              </p>
              <CollapsibleContent>
                <p className="mt-2">
                  Using smart contracts and geolocation, we've created a unique game where
                  players can discover real-world locations, solve puzzles, and earn
                  cryptocurrency rewards. Join our community of modern-day pirates and start
                  your treasure hunting journey today!
                </p>
              </CollapsibleContent>
            </div>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full justify-start"
              >
                {isProjectInfoOpen ? "Show less" : "Show more..."}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">
          TL;DR
        </h2>
        <div className="space-y-4">
          <Collapsible open={isTldrOpen} onOpenChange={setTldrOpen}>
            <div className="text-sm text-muted-foreground">
              <p>
                Epirates is a Web3 treasure hunting game that combines real-world exploration
                with blockchain rewards.
              </p>
              <CollapsibleContent>
                <p className="mt-2">
                  Find treasures in real locations, solve puzzles, and earn crypto. Perfect
                  for adventure seekers and crypto enthusiasts!
                </p>
              </CollapsibleContent>
            </div>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full justify-start"
              >
                {isTldrOpen ? "Show less" : "Show more..."}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full" onClick={handleConnectWallet}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100 mb-4">
          Social Links
        </h2>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1" 
            asChild
          >
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1" 
            asChild
          >
            <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </a>
          </Button>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <ThemeToggle className="w-full justify-start" />
      </div>
    </div>
  );
};