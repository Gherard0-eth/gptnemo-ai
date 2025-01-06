import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { getAIResponse } from "@/utils/aiAgent";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PirateChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ahoy, treasure seeker! I be Captain Nemo, keeper of the islands' secrets. Share yer thoughts, and I'll guide ye... for the right price!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!isUnlocked) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input },
        {
          role: "assistant",
          content: "Arr! Ye need to unlock my wisdom with some cryptocurrency first, matey!",
        },
      ]);
    } else {
      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "user", content: input }]);

      try {
        const aiResponse = await getAIResponse(input);
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get response from Captain Nemo. Try again later!",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    setInput("");
  };

  return (
    <div className="flex flex-col h-[500px] w-full apple-container">
      <ChatHeader />
      <ScrollArea className="flex-1 p-4 overflow-hidden">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <ChatMessage key={i} role={message.role} content={message.content} />
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        isUnlocked={isUnlocked}
        setIsUnlocked={setIsUnlocked}
        isLoading={isLoading}
      />
    </div>
  );
};