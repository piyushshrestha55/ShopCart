import { NextResponse } from "next/server";
import { user } from "@/models/User";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await user.create({ name, email, password: hashedPassword });
    return NextResponse.json({
      message: "User has been successfully registered"
    });
  } catch (err) {
    return NextResponse.json(
      { error: "An error as occurred during the registration" },
      { status: 500 }
    );
  }
}
