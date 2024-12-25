import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialLinks = () => {
  return (
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
  );
};