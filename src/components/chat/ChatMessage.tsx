interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          role === "user"
            ? "bg-apple-accent text-white"
            : "bg-apple-gray-200 dark:bg-apple-gray-600 text-apple-gray-700 dark:text-apple-gray-100"
        }`}
      >
        {content}
      </div>
    </div>
  );
};