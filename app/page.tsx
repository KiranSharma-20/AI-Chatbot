"use client";
import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import SideBar from "@/components/SideBar/page";
import NavBar from "@/components/NavBar/page";
import { SendHorizontal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatSkeleton from "@/components/ChatSkeleton/page";
import ChatBubble from "@/components/ChatBubble/page";

export default function Home({
  id,
  initialMessages = [],
}: {
  id: string;
  initialMessages: any[];
}) {
  const [input, setInput] = useState(" ");
  const [sideberOpen, setSidebarOpen] = useState(true);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, setMessages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "inherit";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput(" ");
  };
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300 overflow-hidden">
      <SideBar
        isOpen={sideberOpen}
        setIsOpen={setSidebarOpen}
        setMessages={setMessages}
      />
      <main className="flex-1 flex flex-col relative w-full overflow-hidden ">
        <div className="absolute top-0 right-0w-[40%] h-[40%] bg-blue-500/5 blur-[100px] pointer-events-none" />
        <NavBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto z-10 pb-40">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                key="starter"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 text-blue-500">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-2xl font-bold dark:text-white mb-2">
                  How can I help you today?
                </h2>
                <div className="grid grid-cols-1  md:grid-cols-2 gap-3 w-full max-w-xl mt-8 px-4">
                  {[
                    "Next.js 14 Features",
                    "Glassmorphism UI ",
                    "Framer Motion",
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setInput(t)}
                      className="p-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-left text-sm dark:text-slate-300 hover:border-blue-500/40 transition-all font-medium"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div key="chat">
                {messages.map((m) => {
                  // console.log("Message content:", m);
                  return (
                    <ChatBubble
                      id={m.id}
                      key={m.id}
                      role={m.role === "assistant" ? "ai" : "user"}
                      content={m.parts
                        .map((part) => {
                          if (part.type === "text") {
                            return part.text;
                          }
                          return null;
                        })
                        .join("")}
                      // content={(m as any).content}
                    />
                  );
                })}

                {status === "streaming" && <ChatSkeleton />}
              </div>
            )}
          </AnimatePresence>
          {status === "streaming" || status === "submitted" ? (
            <div className="flex justify-start">
              <div className="pl-15 font-bold italic">
                AI is thinking
                <motion.span
                  initial={{ opacity: [1, 0, 1] }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="font-bold"
                >
                  ...
                </motion.span>
              </div>
            </div>
          ) : null}
        </div>
        {}
        <form onSubmit={handleSubmit}>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 dark:from-[#030712] via-slate-50/95 dark:via-[#030712]/95 to-transparent z-20">
            <div className="max-w-3xl mx-auto relative group">
              <textarea
                ref={textAreaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), handleSubmit)
                }
                placeholder="Message AI Studio..."
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pr-14 px-6 focus:outline-none focus:ring-1 focus:ring-blue-500/40 dark:focus:bg-[#11827] transition-all dark:text-slate-200 resize-none max-h-48"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === "streaming"}
                className="absolute right-3 bottom-3.5 p-2.5 bg-blue-600 text-white  rounded-xl hover:bg-blue-700  transition-all disabled:opacity-50"
              >
                <SendHorizontal size={20} />
              </button>
            </div>
            <p className="text-[10px] text-center mt-4 text-slate-500 font-bold uppercase -tracking-widest">
              UI/UX Optimized for portals
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
