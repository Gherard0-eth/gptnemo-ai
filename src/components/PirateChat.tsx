import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useTreasureHunt } from "@/hooks/useTreasureHunt";
import { useUserStore } from "@/stores/useUserStore";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface PirateChatProps {
  islandId: string;
  userAddress: string;
}

export function PirateChat({ islandId, userAddress }: PirateChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sendChatMessage } = useTreasureHunt();
  const { toast } = useToast();
  const { username } = useUserStore();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    try {
      const { success, response, error } = await sendChatMessage(
        newMessage,
        islandId,
        userAddress
      );

      if (success && response) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        toast({
          title: "Error",
          description: error || "Failed to get response from the mystical AI.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold">Mystical Guide</h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask the mystical AI for guidance..."
            disabled={isLoading || !username}
          />
          <Button type="submit" disabled={isLoading || !username}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}