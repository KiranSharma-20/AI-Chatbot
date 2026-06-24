"use client";
import {
  Menu,
  Sparkles,
  ChevronDown,
  Globe,
  ShieldCheck,
  Share2,
} from "lucide-react";
export default function NavBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/5 z-20 backdrop-blur-md sticky top-0">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl  bg-slate-100 dark:bg-white/5  border border-slate-200 dark:border-white/10">
          <Sparkles size={14} className="text-blue-500" />
          <span className="text-xs font-bold dark:text-slate-200">GPT-4o</span>
          <ChevronDown size={12} className="text-slate-400" />
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <div className="flex items-center gap-1.5">
          <Globe size={12} className="text-blue-500" />
          EdgeRuntime
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-green-500" />
          Encrypted
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors">
          <Share2 size={18} />
        </button>
        <button className="hidden sm:block px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase rounded-lg transition-all shadow-lg  shadow-blue-600/20">
          Live View
        </button>
      </div>
    </nav>
  );
}
