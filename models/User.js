import { Timestamp } from "mongodb";
import mongoose, { models, Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["Customer", "Vendor"],
      required: true
    }
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", userSchema);
