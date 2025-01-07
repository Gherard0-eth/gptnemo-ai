import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PirateChat = () => {
  const { id: islandId } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Greetings, seeker of treasures! I am the mystical guardian of these islands. To unlock my guidance, you'll need some cryptocurrency for message credits!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !islandId) return;

    try {
      setMessages((prev) => [...prev, { role: "user", content: input }]);
      
      const { data, error } = await supabase.functions.invoke('tee-agent', {
        body: {
          action: 'chat',
          data: {
            message: input,
            islandId,
            userAddress: '0x123', // TODO: Replace with actual user address
          }
        }
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
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