import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";

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
    <div className="flex flex-col h-full w-full apple-container">
      <ChatHeader />
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <ChatMessage key={i} role={message.role} content={message.content} />
          ))}
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