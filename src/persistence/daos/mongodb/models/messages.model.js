
import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  message: { type: String, required: true, maxLength: 500 },
});

export const MessagesModel = mongoose.model(messagesCollection, messagesSchema);