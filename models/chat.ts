import mongoose, { Schema } from "mongoose";
const ChatSchema = new Schema({
  chatId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    default: "New Chat",
  },
  messages:
    [
      {
        role: {
          type: String,
          enum: ["user", "assistant", "model"],
          required: true,
        },
        parts: [{
          text: {
            type: String,
            required: true,

          }
        }]
      }]
},
  {
    timestamps: true
  });

  
const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default Chat;