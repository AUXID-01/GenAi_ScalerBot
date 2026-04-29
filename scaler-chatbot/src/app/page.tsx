"use client";

import { useState, useCallback } from "react";
import { Message, Persona } from "@/lib/types";
import { personas } from "@/lib/personas";
import PersonaSwitcher from "@/components/PersonaSwitcher";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import SuggestionChips from "@/components/SuggestionChips";

export default function Home() {
  const [activePersonaId, setActivePersonaId] = useState<string>(personas[0].id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activePersona: Persona =
    personas.find((p) => p.id === activePersonaId) ?? personas[0];

  const handlePersonaSwitch = (id: string) => {
    setActivePersonaId(id);
    setMessages([]);
    setError(null);
  };

  const sendMessage = useCallback(
    async (userText: string) => {
      if (isLoading) return;
      setError(null);

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: userText,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            systemPrompt: activePersona.systemPrompt,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "API call failed");
        }

        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: unknown) {
        const errMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errMsg);
        // Remove the user message if the API call fails so the user can retry
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, activePersona]
  );

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">Scaler</span>
          <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full">
            AI Personas
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
          <span className="text-base">{activePersona.avatar}</span>
          <span className={`font-medium ${activePersona.color}`}>
            {activePersona.name}
          </span>
        </div>
      </div>

      {/* Persona Switcher */}
      <PersonaSwitcher
        personas={personas}
        activeId={activePersonaId}
        onSwitch={handlePersonaSwitch}
      />

      {/* Chat Area */}
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        persona={activePersona}
      />

      {/* Error Banner */}
      {error && (
        <div className="mx-4 mb-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          ⚠️ {error}. Please try again.
        </div>
      )}

      {/* Suggestion Chips */}
      <SuggestionChips
        suggestions={activePersona.suggestions}
        onSelect={sendMessage}
      />

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </main>
  );
}