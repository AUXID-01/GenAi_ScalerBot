import { Message } from "@/lib/types";
import { Persona } from "@/lib/types";

interface Props {
  message: Message;
  persona: Persona;
}

export default function MessageBubble({ message, persona }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg mr-2 flex-shrink-0 mt-1">
          {persona.avatar}
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-gray-900 text-white rounded-br-sm"
            : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
        }`}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs ml-2 flex-shrink-0 mt-1">
          You
        </div>
      )}
    </div>
  );
}