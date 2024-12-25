import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PirateChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ahoy matey! I be the AI Pirate, ready to help ye find treasures. But first, ye'll need some cryptocurrency to unlock me hints!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!isUnlocked) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        {
          role: "assistant",
          content: "Yarr! Ye need to unlock me hints with some cryptocurrency first, ye scurvy dog!",
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        {
          role: "assistant",
          content: "Arr! That be a fine question. *Feature coming soon with cryptocurrency integration*",
        },
      ]);
    }
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md apple-container">
      <div className="flex items-center gap-2 p-4 border-b border-apple-gray-200 dark:border-apple-gray-600">
        <MessageSquare className="text-apple-gray-500 dark:text-apple-gray-300" />
        <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">AI Assistant</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-apple-accent text-white"
                    : "bg-apple-gray-200 dark:bg-apple-gray-600 text-apple-gray-700 dark:text-apple-gray-100"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

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
    </div>
  );
};