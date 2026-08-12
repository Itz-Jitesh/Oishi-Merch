import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      },
      orders: {
        count: 0,
      },
      loyaltyPoints: 0,
      wishlistCount: 0,
      image: session.user.image,
    });
  } catch (error) {
    console.error("Account overview error:", error);

    return NextResponse.json(
      { message: "Failed to fetch account overview" },
      { status: 500 }
    );
  }
}