import { MessageSquare } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-apple-gray-200 dark:border-apple-gray-600">
      <MessageSquare className="text-apple-gray-500 dark:text-apple-gray-300" />
      <h2 className="font-display text-xl text-apple-gray-700 dark:text-apple-gray-100">AI Assistant</h2>
    </div>
  );
};