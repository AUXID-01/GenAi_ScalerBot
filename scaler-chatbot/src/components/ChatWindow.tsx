import { useEffect, useRef } from "react";
import { Message, Persona } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: Message[];
  isLoading: boolean;
  persona: Persona;
}

export default function ChatWindow({ messages, isLoading, persona }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-1">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-3 py-12">
          <span className="text-5xl">{persona.avatar}</span>
          <div>
            <p className="font-medium text-gray-600">{persona.name}</p>
            <p className="text-sm">{persona.title}</p>
            <p className="text-xs mt-2 text-gray-400">
              Select a suggestion below or type your question
            </p>
          </div>
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} persona={persona} />
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg mr-2 flex-shrink-0">
            {persona.avatar}
          </div>
          <TypingIndicator />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}