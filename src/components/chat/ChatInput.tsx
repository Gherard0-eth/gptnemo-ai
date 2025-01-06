import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isUnlocked: boolean;
  setIsUnlocked: (value: boolean) => void;
}

export const ChatInput = ({ input, setInput, handleSend, isUnlocked, setIsUnlocked }: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-apple-gray-200 dark:border-apple-gray-600">
      {!isUnlocked && (
        <Button
          onClick={() => setIsUnlocked(true)}
          className="w-full mb-4 apple-button"
        >
          Unlock Hints with Cryptocurrency
        </Button>
      )}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about treasures..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-apple-gray-100 dark:bg-apple-gray-600 border-apple-gray-200 dark:border-apple-gray-500"
        />
        <Button onClick={handleSend} className="apple-button">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};