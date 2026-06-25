"use server";
import dbConnect from "@/lib/mongodb";
import Chat from "@/models/chat";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getChatList() {
  try {
    await dbConnect();

    const rawChats = await Chat.find({}, "chatId title").sort({ updatedAt: -1 }).lean();
    const cleanChats = JSON.parse(JSON.stringify(rawChats));
    return Response.json(cleanChats || []);
  } catch {
    console.error("Error fetching chat list");
    return [];
  }

}

export async function saveChat(chatId: string, messages: any) {
  await dbConnect();
  console.log("starting to save");
  console.log(chatId);
  const safeChatId = chatId && chatId !== "undefined" ? chatId : `session_${Date.now()}`;
  console.log("safeChatId:", safeChatId);
  const firstUserMessage = messages.find((msg: any) => msg.role === "user");
  console.log("firstUserMessage:", firstUserMessage?.parts?.[0]?.text);
  const title = firstUserMessage?.parts?.[0]?.text || "New Chat";
  console.log("title:", title);
  try {
    await Chat.findOneAndUpdate(
      { chatId: safeChatId },
      { chatId: safeChatId, title, messages },
      { upsert: true, returnDocument: "after" }
    );
    console.log("Chat saved to database");
    revalidatePath("/");
  } catch (error) {
    console.error("Error saving chat:", error);
  }

}


export async function deleteChat(chatId: string) {
  await dbConnect();
  await Chat.findOneAndDelete({ chatId });
  revalidatePath("/");
  redirect("/");
}