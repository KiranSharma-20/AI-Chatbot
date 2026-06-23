import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { saveChat } from "@/app/actions";


export async function POST(req: Request) {
  console.log("Received messages for processing:");
  try {
    const { messages, chatId }: { messages: UIMessage[]; chatId: string } = await req.json();
    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: await convertToModelMessages(messages),
      onFinish: async ({ text }) => {
        console.log(" starting");
        const assistantMessage = { role: "assistant", parts: [{ text: text }] };
        const completeChatHistory = [...messages, assistantMessage];
        // console.log("Finished processing messages. Saving chat...", text.messages);
        await saveChat(chatId, completeChatHistory);
        console.log("Chat saved successfully.");
      }

    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("Error streaming response", error);
    return new Response("Failed to stream text", { status: 500 });
  }
}