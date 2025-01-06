import { useState } from "react";
import { Button } from "./button";
import { useIsMobile } from "@/hooks/use-mobile";

interface CollapsibleTextProps {
  text: string;
  maxLength?: number;
}

export function CollapsibleText({ text, maxLength = 150 }: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile || text.length <= maxLength) {
    return <p className="text-apple-gray-100 leading-relaxed whitespace-pre-line">{text}</p>;
  }

  const truncatedText = isExpanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <div className="space-y-2">
      <p className="text-apple-gray-100 leading-relaxed whitespace-pre-line">
        {truncatedText}
      </p>
      <Button
        variant="link"
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[#0EA5E9] hover:text-[#0EA5E9]/90 p-0 h-auto font-medium"
      >
        {isExpanded ? "Show less" : "Show more"}
      </Button>
    </div>
  );
}