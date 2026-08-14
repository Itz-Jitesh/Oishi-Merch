import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const currentUser = await User.findById(session.user.id);

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const normalized = slug.trim();
    const wishlist = currentUser.wishlist || [];
    const exists = wishlist.includes(normalized);

    if (exists) {
      currentUser.wishlist = wishlist.filter((s) => s !== normalized);
    } else {
      currentUser.wishlist = [...wishlist, normalized];
    }

    currentUser.wishlistCount = currentUser.wishlist.length;

    await currentUser.save();

    return NextResponse.json({ wishlist: currentUser.wishlist }, { status: 200 });
  } catch (error) {
    console.error("Error toggling wishlist:", error);

    return NextResponse.json(
      { error: "Failed to update wishlist" },
      { status: 500 }
    );
  }
}
