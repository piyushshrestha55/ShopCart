import { NextResponse } from "next/server";
import { User } from "@/models/User";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcrypt";
export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDB();
    await User.create({ name, email, password: hashedPassword, role });
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
