# AI Chatbot

A modern AI assistant built with Next.js app router, AI SDK integration, Tailwind CSS, Framer Motion, and MongoDB persistence.

## Key Features

- Chat interface with AI-powered assistant
- Auto-resizing message input textarea
- Sidebar for chat session navigation
- Streaming response support and skeleton loading state
- Dark mode ready UI with animated transitions
- MongoDB-backed chat persistence via server actions

## Project Structure

- `app/page.tsx` — main chat screen and client-side chat logic
- `app/actions.ts` — server actions for loading, saving, and deleting chats
- `app/api/chat/route.ts` — chat API route
- `components/SideBar/page.tsx` — sidebar UI and session controls
- `components/NavBar/page.tsx` — top navigation bar
- `components/ChatBubble/page.tsx` — chat message rendering
- `components/ChatSkeleton/page.tsx` — loading placeholder while AI streams responses
- `lib/mongodb.ts` — MongoDB connection helper
- `models/chat.ts` — chat schema and model definition

## Getting Started

### Requirements

- Node.js 20+
- npm, Yarn, or pnpm
- MongoDB connection string

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Setup

Create a `.env` file at the project root with your MongoDB connection string and any AI provider keys required by `@ai-sdk`.

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase
NEXT_PUBLIC_APP_ENV=development
```

> If you are using an AI provider like OpenAI or Google, add the appropriate provider keys according to `@ai-sdk` documentation.

## Commands

- `npm run dev` — start development server
- `npm run build` — build production app
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Notes

- The app relies on `@ai-sdk/react` for chat state and streaming responses.
- Chat sessions are saved in MongoDB using `Chat.findOneAndUpdate` in `app/actions.ts`.
- `app/page.tsx` uses `AnimatePresence` and `motion` from Framer Motion for smooth UI transitions.

## Deployment

Deploy this app on Vercel or any platform that supports Next.js.

1. Configure environment variables on your hosting provider.
2. Build and deploy.

## License

MIT
