import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { Product } from "@/models/Product";
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("Error fetching the products.");
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
