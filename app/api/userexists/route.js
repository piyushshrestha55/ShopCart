import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    const user = await User.findOne({ email }).select("_id");
    console.log("User: ", user);
    return NextResponse.json({ user });
  } catch (err) {
    console.log("Error fetching users:", err);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
