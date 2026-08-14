import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import { auth } from "@/auth";
import { PRODUCTS } from "@/data/product";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const currentUser = await User.findById(session.user.id).select(
      "wishlist"
    );

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const wishlist = currentUser.wishlist || [];

    const items = wishlist
      .map((slug) => PRODUCTS.find((p) => p.slug === slug))
      .filter(Boolean)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        category: p.category,
        images: p.images,
      }));

    return NextResponse.json({ items, wishlist }, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);

    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}
