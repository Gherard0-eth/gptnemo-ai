import { useState } from "react";
import { Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

export const MenuContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="font-pirate text-xl text-pirate-navy dark:text-pirate-gold">
          About Epirates
        </h2>
        <div className="space-y-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="text-sm text-muted-foreground dark:text-pirate-gold/70">
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
                className="mt-2 w-full justify-start dark:text-pirate-gold/70"
              >
                {isOpen ? "Show less" : "Show more..."}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>

          <div className="space-y-2">
            <h3 className="font-pirate text-lg text-pirate-navy dark:text-pirate-gold">
              TL;DR
            </h3>
            <p className="text-sm text-muted-foreground dark:text-pirate-gold/70">
              A Web3 treasure hunting game with real crypto rewards!
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-pirate text-xl text-pirate-navy dark:text-pirate-gold mb-4">
          Social Links
        </h2>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 border-pirate-gold/10 dark:text-pirate-gold/70 hover:border-pirate-gold/30" 
            asChild
          >
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-pirate-gold/10 dark:text-pirate-gold/70 hover:border-pirate-gold/30" 
            asChild
          >
            <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};