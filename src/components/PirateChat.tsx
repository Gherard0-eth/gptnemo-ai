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
    <div className="flex flex-col h-[500px] w-full max-w-md border border-pirate-brown rounded-lg bg-white/95 shadow-lg">
      <div className="flex items-center gap-2 p-4 border-b border-pirate-brown bg-pirate-navy text-white rounded-t-lg">
        <MessageSquare className="text-pirate-gold" />
        <h2 className="font-pirate text-xl">AI Pirate Chat</h2>
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
                    ? "bg-pirate-ocean text-white"
                    : "bg-pirate-gold/20 text-pirate-navy"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-pirate-brown">
        {!isUnlocked && (
          <Button
            onClick={() => setIsUnlocked(true)}
            className="w-full mb-4 bg-pirate-gold hover:bg-pirate-gold/90 text-pirate-navy font-pirate"
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
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="bg-pirate-navy hover:bg-pirate-navy/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};