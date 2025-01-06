import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  isUnlocked: boolean;
  setIsUnlocked: (isUnlocked: boolean) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  setInput,
  handleSend,
  isUnlocked,
  setIsUnlocked,
  isLoading,
}: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t dark:border-gray-600 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-2">
        <Button
          variant={isUnlocked ? "outline" : "default"}
          size="icon"
          onClick={() => setIsUnlocked(!isUnlocked)}
          className="shrink-0"
        >
          <Lock className="h-4 w-4" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1"
          disabled={!isUnlocked || isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || !isUnlocked || isLoading}
          className="shrink-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}