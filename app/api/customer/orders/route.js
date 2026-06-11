import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "Customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { product_id, location, quantity } = await req.json();
    const product = await Product.findById(product_id); //finding the product by the id
    //validating the product
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }
    const total = product.price * quantity;
    const newOrder = await Order.create({
      customer_id: new mongoose.Types.ObjectId(session.user._id),
      product_id: new mongoose.Types.ObjectId(product._id),
      quantity,
      location,
      total: total,
      status: "Pending"
    });
    //Decrementing the stock
    product.stock -= quantity;
    await product.save();

    return NextResponse.json(
      { message: "Your Order has been placed", order: newOrder },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error placing Order ", err);
    return NextResponse.json(
      { message: "Error placing Order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "Customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    //finding the ordered product of the customer
    const orders = await Order.find({
      customer_id: new mongoose.Types.ObjectId(session.user._id)
    })
      .populate("product_id", "product_name price product_image")
      .populate({
        path: "product_id",
        populate: { path: "vendor_id", select: "name email" }
      });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching the orders" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "Customer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await req.json();

  const updatedOrder = await Order.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(orderId),
      customer_id: session.user._id
    },
    { status: "Cancelled" },
    { returnDocument: "after" }
  ).lean();

  if (!updatedOrder) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  // Restore product stock
  await Product.findByIdAndUpdate(updatedOrder.product_id, {
    $inc: { stock: updatedOrder.quantity }
  });
  return NextResponse.json({ order: updatedOrder }, { status: 200 });
}
