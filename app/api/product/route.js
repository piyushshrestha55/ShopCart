import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Create product with vendor_id from session
    const product = await Product.create({
      product_name: body.product_name,
      price: body.price,
      product_des: body.product_des,
      vendor_id: new mongoose.Types.ObjectId(session.user._id),
      product_image: body.product_image
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "Vendor") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all products for this vendor
    const products = await Product.find({ vendor_id: session.user._id });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
