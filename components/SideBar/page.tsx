"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getChatList, deleteChat } from "@/app/actions";
import {
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  History,
  Trash2,
  Plus,
  Sun,
  Moon,
  User,
} from "lucide-react";
import { UIMessage } from "ai";
import { set } from "mongoose";

export default function SideBar({
  isOpen,
  setIsOpen,
  setMessages,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  setMessages: (messages: UIMessage[]) => void;
}) {
  // const { theme, setTheme } = useTheme();
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [chats, setChats] = useState<any[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    const loadChats = async () => {
      try {
        console.log("1. Fetching chat list...");
        const data = await getChatList();
        console.log("Fetched chats:", data);
        console.log("2. Updating state with fetched chats...");
        setChats(data);
        console.log("State updated with chats:", data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    loadChats();
  }, []);
  if (!mounted) return null;
  console.log(isOpen);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.aside
        // animate={{ width: isOpen ? "260px" : "64px" }}
        className={`fixed  inset-y-0 left-0 z-50 lg:relative transition-colors duration-300 bg-white/80 dark:[#0f172a]/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 p-4 flex flex-col h-screen overflow-hidden ${isOpen ? "w-64" : "w-16"}`}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <AnimatePresence>
            {" "}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent italic"
              >
                AI Studio
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
          >
            {isOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </button>
        </div>
        <button
          className={`flex items-center gap-3 w-full p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all mb-6 shadow-lg shadow-blue-500/20 ${isOpen ? "justify-start gap-3 w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl" : "justify-center w-10 h-10 mx-auto p-0 bg-blue-600  hover:bg-blue-700 text-white rounded-xl"}`}
        >
          <MessageSquarePlus size={20} />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium text-sm"
              onClick={(e) => setMessages([])}
            >
              New Chat
            </motion.span>
          )}
        </button>
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          <div
            className={`flex ${isOpen ? "justify-start pl-2 mb-2" : "justify-center mb-4"}`}
          >
            {isOpen ? (
              <p className="text-xs pl-2 font-semibold text-gray-500 uppercase mb-2 ">
                History
              </p>
            ) : (
              <span className="text-[10px] font-bold text-gray-400">
                {" "}
                <History size={18} className="text-gray-500" />
              </span>
            )}
          </div>

          {isOpen && chats && chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.chatId}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all group"
              >
                <Link
                  href={`/chat/${chat.chatId}`}
                  className={`flex items-center gap-2 flex-1 truncate ${isOpen ? "w-full p-3 justify-start" : "w-10 h-10 mx-auto justify-center p-0  text-transparent"}`}
                >
                  <History size={14} className="text-gray-500" />

                  {isOpen && (
                    <span className="truncate text-zinc-500 group-hover:text-white">
                      {chat.title}
                    </span>
                  )}
                </Link>
                (
                <form action={async () => await deleteChat(chat.chatId)}>
                  <button
                    type="submit"
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>
                )
              </div>
            ))
          ) : (
            <div>
              {" "}
              {isOpen && (
                <p className="text-sm text-slate-500 dark:text-slate-400 p-3">
                  No chat history available.
                </p>
              )}
            </div>
          )}
        </nav>
        <div className="pt-4 border-t border-slate-200 dark:border-white/5 space-y-2">
          {/* {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              {isOpen && <span className="text-sm">Appearance</span>}
            </button>
          )} */}{" "}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon">
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-100  border-0 outline-0 rotate-0  transition-all dark:scale-0 dark:-rotate-90 " />
                  <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:border-0 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div
            className={`flex items-centergap-3 w-full p-2 rounded-xl bg-slate-50 dark:bg-whte/5 border border-slate-200 dark:border-white/5 ${isOpen ? "" : "bg-transparent "}`}
          >
            <div
              className={`w-8 h-8 rounded-full  bg-blue-500 flex items-center justify-center shrink-0 ${isOpen ? "" : "-ml-2"}`}
            >
              <User size={16} className="text-white" />
            </div>
            {isOpen && (
              <span className="text-sm  pl-2  pt-1 font-medium truncate dark:text-black uppercase tracking-tighter">
                Placement Pro
              </span>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
