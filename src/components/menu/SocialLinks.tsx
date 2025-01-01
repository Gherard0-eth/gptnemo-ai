import { Github, Twitter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialLinks = () => {
  return (
    <div className="space-y-2">
      <h2 className="font-display text-lg text-apple-gray-700 dark:text-apple-gray-100 mb-3">
        Social Links
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center justify-center text-xs" 
          asChild
        >
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
            <Github className="mr-1 h-3 w-3" />
            GitHub
          </a>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center justify-center text-xs" 
          asChild
        >
          <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
            <Twitter className="mr-1 h-3 w-3" />
            Twitter
          </a>
        </Button>
      </div>
      <Button 
        variant="outline" 
        size="sm"
        className="flex items-center justify-center text-xs w-full" 
        asChild
      >
        <a href="/docs" target="_blank" rel="noopener noreferrer">
          <FileText className="mr-1 h-3 w-3" />
          Docs
        </a>
      </Button>
    </div>
  );
};