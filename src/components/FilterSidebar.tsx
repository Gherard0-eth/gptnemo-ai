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
import { Search } from "lucide-react";

export function FilterSidebar() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="treasure-mode" className="text-apple-gray-700 dark:text-apple-gray-100">
            Treasure Mode
          </Label>
          <div className="text-sm text-apple-gray-500 dark:text-apple-gray-300">
            Unlock special hints
          </div>
        </div>
        <Switch id="treasure-mode" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="search" className="text-apple-gray-700 dark:text-apple-gray-100">
          Search Islands
        </Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-apple-gray-400 dark:text-apple-gray-300" />
          <Input
            id="search"
            placeholder="Island name or ID..."
            className="pl-8 bg-white dark:bg-apple-gray-600 border-apple-gray-200 dark:border-apple-gray-500 
                     text-apple-gray-700 dark:text-apple-gray-100 placeholder:text-apple-gray-400 
                     dark:placeholder:text-apple-gray-300"
          />
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="region">
          <AccordionTrigger className="text-apple-gray-700 dark:text-apple-gray-100">
            Region
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Northern Seas", "Southern Waters", "Eastern Bay", "Western Depths"].map((region) => (
                <Button
                  key={region}
                  variant="ghost"
                  className="w-full justify-start text-apple-gray-600 dark:text-apple-gray-200 
                           hover:bg-apple-gray-100 dark:hover:bg-apple-gray-600"
                >
                  {region}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="climate">
          <AccordionTrigger className="text-apple-gray-700 dark:text-apple-gray-100">
            Climate
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Tropical", "Temperate", "Stormy", "Arid"].map((climate) => (
                <Button
                  key={climate}
                  variant="ghost"
                  className="w-full justify-start text-apple-gray-600 dark:text-apple-gray-200 
                           hover:bg-apple-gray-100 dark:hover:bg-apple-gray-600"
                >
                  {climate}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terrain">
          <AccordionTrigger className="text-apple-gray-700 dark:text-apple-gray-100">
            Terrain
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Volcanic", "Coral", "Jungle", "Rocky"].map((terrain) => (
                <Button
                  key={terrain}
                  variant="ghost"
                  className="w-full justify-start text-apple-gray-600 dark:text-apple-gray-200 
                           hover:bg-apple-gray-100 dark:hover:bg-apple-gray-600"
                >
                  {terrain}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}