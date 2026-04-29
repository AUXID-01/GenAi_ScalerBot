export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }
  
  export interface Persona {
    id: string;
    name: string;
    title: string;
    avatar: string;        // emoji avatar
    color: string;         // Tailwind accent color class
    bgColor: string;       // Tailwind bg class for active state
    systemPrompt: string;
    suggestions: string[];
  }