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
              Welcome to Project Nemo, the world's first AI-powered treasure hunting game! Join players worldwide in an exciting quest guided by Captain Nemo, our AI guide.
            </p>
            <CollapsibleContent>
              <p className="mt-2">
                Acquire shovels through auctions, unlock Captain Nemo's valuable hints, and compete to find hidden treasures across mysterious islands. Each successful discovery rewards you with real cryptocurrency prizes!
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