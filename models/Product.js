import mongoose, { models, Schema } from "mongoose";

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      required: true,
      unique: true
    },
    product_name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    product_des: {
      type: String,
      required: true
    },
    vendor_id: {
      type: String,
      required: true
    },
    product_image: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

export const Product =
  models.Product || mongoose.model("Product", productSchema);
