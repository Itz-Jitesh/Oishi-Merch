import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { cookies } from "next/headers";
import { PRODUCTS } from "@/data/product";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    try {   
        const cookieStore = await cookies();
        const cartCookie = cookieStore.get("cart");
        const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

        const amount = cart.reduce((total, item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            if (product) {
                return total + product.price * item.quantity;
            }
            return total;
        }, 0);

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error("RAZORPAY CREATE ORDER ERROR:", error);

        return NextResponse.json(
            { error: "Failed to create Razorpay order" },
            { status: 500 }
        );
    }
}