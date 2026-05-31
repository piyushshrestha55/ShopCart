import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    location: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export const Order = models.Order || mongoose.model("Order", orderSchema);
