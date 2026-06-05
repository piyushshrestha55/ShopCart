import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    // Checks if the user is vendor or not
    if (!session || session.user.role !== "Vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Finding the products listed by the vendor
    const vendorProducts = await Product.find({
      vendor_id: session.user._id
    }).select("_id");

    // New extracting all the Product ids in an array
    const productIds = vendorProducts.map((p) => p._id);
    const orders = await Order.find({ product_id: { $in: productIds } })
      .populate("product_id", "product_name price product_image")
      .populate("customer_id", "name email");
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch the Orders" },
      { status: 500 }
    );
  }
}
