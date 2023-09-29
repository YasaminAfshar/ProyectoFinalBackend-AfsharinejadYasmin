
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: { type: String, require: true, unique: true },
  purchaseDateTime: { type: String, required: true },
  amount: { type: Number, require: true },
  purchaser: {type: String, required: true},
  productsPurchased: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number },
      subtotal: { type: Number },
    },
  ],
});


export const TicketModel = mongoose.model("tickets", ticketSchema);