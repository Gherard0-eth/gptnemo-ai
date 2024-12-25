import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ProjectInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">
        Project Info
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
  );
};