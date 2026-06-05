import { NextResponse } from "next/server";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import connectDB from "@/lib/connectDB";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export async function PUT(req, context) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { orderId } = await context.params;
    const { status } = await req.json();
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(orderId) },
      { status },
      { returnDocument: "after" } // returns updated doc
    ).lean(); //lean makes orders now an array of plain JS objects
    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found or no order was placed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: updatedOrder }, { status: 200 });
  } catch (err) {
    console.error("Error updating status:", err);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
