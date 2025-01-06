import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { aiAgent } from "@/utils/aiAgent";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PirateChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ahoy, matey! I be Gaptain Nemo, yer AI guide through these treacherous waters. To unlock me hints for finding treasures, ye'll need to provide a Claude API key!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const apiKey = localStorage.getItem('CLAUDE_API_KEY');
    if (apiKey) {
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!isUnlocked) {
      const apiKey = input.trim();
      localStorage.setItem('CLAUDE_API_KEY', apiKey);
      setIsUnlocked(true);
      setMessages(prev => [...prev, 
        { role: "user", content: "Setting up API key..." },
        { role: "assistant", content: "Arr! Thank ye for the key, matey! Now I can help ye find the treasure!" }
      ]);
    } else {
      setMessages(prev => [...prev, { role: "user", content: input }]);
      
      try {
        const response = await aiAgent.generateResponse(input);
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get a response from Gaptain Nemo. Please try again.",
          variant: "destructive",
        });
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
      />
    </div>
  );
};