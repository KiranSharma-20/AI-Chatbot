"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bot, User, Check, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBubble({
  id,
  role,
  content,
  initialMessages,
}: {
  id: string;
  role: "user" | "ai";
  content: string;
  initialMessages?: any[];
}) {
  const [copied, setCopied] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`flex gap-4 p-6 ${role === "ai" ? "bg-slate-50/50 dark:bg-white/2" : " "} group`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${role === "ai" ? "bg-blue-500/10 border border-blue-500/20" : " bg - purple - 500 / 10 border border-purple-500/20"}`}
      >
        {role === "ai" ? (
          <Bot size={20} className="text-blue-500" />
        ) : (
          <User size={20} className="text-purple-500" />
        )}
      </div>
      <div className="flex-1 flex justify-between items-start">
        <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <button
          onClick={copyText}
          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-md transition-all ml-4 shrink-0"
        >
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} className="text-slate-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
