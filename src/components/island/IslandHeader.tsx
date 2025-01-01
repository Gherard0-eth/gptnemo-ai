import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IslandHeaderProps {
  name: string;
  description: string;
}

export function IslandHeader({ name, description }: IslandHeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 text-apple-gray-700 dark:text-apple-gray-100"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Islands
      </Button>
      
      <h1 className="text-4xl font-display text-apple-gray-700 dark:text-apple-gray-100">
        {name}
      </h1>
      
      <p className="text-apple-gray-500 dark:text-apple-gray-300 mt-4">
        {description}
      </p>
    </>
  );
}