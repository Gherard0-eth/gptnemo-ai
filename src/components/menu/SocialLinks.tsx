import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialLinks = () => {
  return (
    <div className="space-y-2">
      <h2 className="font-display text-lg text-apple-gray-700 dark:text-apple-gray-100 mb-3">
        Social Links
      </h2>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 text-sm" 
          asChild
        >
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-3.5 w-3.5" />
            GitHub
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 text-sm" 
          asChild
        >
          <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
            <Twitter className="mr-2 h-3.5 w-3.5" />
            Twitter
          </a>
        </Button>
      </div>
    </div>
  );
};