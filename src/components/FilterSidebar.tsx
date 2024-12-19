import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Anchor, Search } from "lucide-react";

export function FilterSidebar() {
  return (
    <div className="w-64 bg-white p-4 border-r h-screen overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="treasure-mode">Treasure Mode</Label>
            <div className="text-sm text-muted-foreground">
              Unlock special hints
            </div>
          </div>
          <Switch id="treasure-mode" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Search Islands</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Island name or ID..."
              className="pl-8"
            />
          </div>
        </div>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="region">
            <AccordionTrigger>Region</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Northern Seas
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Southern Waters
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Eastern Bay
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Western Depths
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="climate">
            <AccordionTrigger>Climate</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Tropical
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Temperate
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Stormy
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Arid
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="terrain">
            <AccordionTrigger>Terrain</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Volcanic
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Coral
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Jungle
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Rocky
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}