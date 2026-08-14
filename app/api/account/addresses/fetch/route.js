import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();
    const { user } = await auth();
    const userId = user.id  ;

    const currentUser = await User.findById(userId).select("addresses");

    if (!currentUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    console.log(currentUser.addresses)

    return NextResponse.json(
      {
        addresses: currentUser.addresses || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching addresses:", error);

    return NextResponse.json(
      { message: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}