# Scaler Personas Chatbot

A multi-persona AI chatbot built with Next.js, TypeScript, and Groq.

This app lets users interact with different Scaler leaders (Anshuman, Abhimanyu, and Kshitij), each with a distinct speaking style and system prompt. The frontend provides a smooth, modern chat experience and the backend routes messages to Groq's LLM API.

## Features

- Multi-persona chat experience with instant persona switching
- Persona-specific prompt engineering and curated starter questions
- Responsive chat UI with typing indicator and suggestion chips
- Error handling for missing config and API failures
- Next.js App Router API endpoint for server-side model calls

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Groq SDK (`groq-sdk`)

## Project Structure

```text
src/
  app/
    api/chat/route.ts        # Chat API endpoint (Groq integration)
    page.tsx                 # Main chat page and state management
    layout.tsx               # App layout
  components/
    ChatWindow.tsx
    ChatInput.tsx
    PersonaSwitcher.tsx
    SuggestionChips.tsx
    MessageBubble.tsx
    TypingIndicator.tsx
  lib/
    personas.ts              # Persona metadata + system prompts
    types.ts                 # Shared TypeScript types
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

### 3) Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Run app in development mode
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Contract

### `POST /api/chat`

Request body:

```json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "systemPrompt": "You are ..."
}
```

Response body:

```json
{
  "message": "Model response text"
}
```

Error response:

```json
{
  "error": "Error message"
}
```

## Deployment

You can deploy this app on platforms that support Next.js (for example [Vercel](https://vercel.com/)).

Make sure `GROQ_API_KEY` is added to your deployment environment variables before going live.

## Troubleshooting

- **`GROQ_API_KEY is not configured`**: Add `GROQ_API_KEY` to `.env` and restart dev server.
- **API errors from Groq**: Verify key validity, model access, and internet connectivity.
- **Build/lint issues**: Run `npm run lint` and fix type or style errors before deployment.
