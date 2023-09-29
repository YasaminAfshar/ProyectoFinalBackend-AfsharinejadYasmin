
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  lastConnection: {
    type: String,
    required: false,
  },
});

export const UserModel = mongoose.model("users", userSchema);
