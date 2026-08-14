import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { auth } from "@/auth";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";

export async function POST(req) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.provider === "google") {
      return NextResponse.json(
        { message: "Password changes are not allowed for accounts authenticated with Google." },
        { status: 400 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { message: "Password changes are not enabled for this account." },
        { status: 400 }
      );
    }

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordCorrect) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change password error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}