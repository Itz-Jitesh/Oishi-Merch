import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import Order from "@/models/orders";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(session.user.id).select(
            "username email image wishlistCount loyaltyPoints"
        );

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const ordersCount = await Order.countDocuments({
            user: session.user.id,
        });

        


        return NextResponse.json({
            user: {
                name: user.username,
                email: user.email,
                image: user.image,
            },
            orders: {
                count: ordersCount,
            },
            loyaltyPoints: user.loyaltyPoints ?? 0,
            wishlistCount: user.wishlistCount ?? 0,
        });
    } catch (error) {
        console.error("Account overview error:", error);

        return NextResponse.json(
            { message: "Failed to fetch account overview" },
            { status: 500 }
        );
    }
}