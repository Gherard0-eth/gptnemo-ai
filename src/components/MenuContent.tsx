import { useState } from "react";
import { Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ThemeToggle } from "./ThemeToggle";
import { ConnectKitButton } from "./Web3Provider";
import { Link } from "react-router-dom";

export const MenuContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">
          About Epirates
        </h2>
        <div className="space-y-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
                {isOpen ? "Show less" : "Show more..."}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      <div className="space-y-4">
        <ConnectKitButton />
        <Link to="/profile">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
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