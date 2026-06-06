import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(req, context) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "Vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //unwrapping params properly
    const { id } = await context.params;

    const body = await req.json();
    const stock = Number(body.stock);

    if (isNaN(stock) || stock < 0) {
      return NextResponse.json(
        { error: "Stock must be a non-negative number" },
        { status: 400 }
      );
    }

    // Updating the stock for this product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, vendor_id: session.user._id },
      { stock },
      { returnDocument: "after" } // replaces deprecated { new: true }
    ).lean();

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found or not owned by vendor" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.error("Error updating stock:", err);
    return NextResponse.json(
      { error: "Failed to update stock" },
      { status: 500 }
    );
  }
}
