import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Chat from "@/models/chat";
import ChatBubble from "@/components/ChatBubble/page";
import Home from "@/app/page";
export default async function ChatPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const chat = await Chat.findOne({ chatId: params.id });
  if (!chat) {
    notFound();
  }
  return (
    <div className="flex flex-col h-full">
      <Home
        id={params.id}
        initialMessages={JSON.parse(JSON.stringify(chat.messages))}
      />
    </div>
  );
}
