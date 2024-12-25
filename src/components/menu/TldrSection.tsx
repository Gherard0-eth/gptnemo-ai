import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const TldrSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">
        TL;DR
      </h2>
      <div className="space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
              {isOpen ? "Show less" : "Show more..."}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    </div>
  );
};