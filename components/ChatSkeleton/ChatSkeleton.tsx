"use client";
export default function ChatSkeleton() {
  return (
    <div className="flex gap-4 p-6 bg-slate-50/50 dark:bg-white/2 animate-pulse">
      <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-white/10 shrink-0"></div>
      <div className="flex-1 space-y-3 pt-2">
        <div className="h-2 bg-slate-200 dark:bg-white/10 rounded-full w-[85%]"></div>
        <div className="h-2 bg-slate-200 dark:bg-white/10 rounded-full w-[60%]"></div>
      </div>
    </div>
  );
}
