import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { PRODUCTS } from "@/data/product";
import { auth } from "@/auth";
import connectDB from "@/lib/db/connect";
import Order from "@/models/orders";
import User from "@/models/users";

export async function POST(req) {
    try {
        // 1. Get logged-in user
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // 2. Get Razorpay response + address from frontend
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            shippingAddress,
        } = await req.json();

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing Razorpay payment details",
                },
                { status: 400 }
            );
        }

        // 3. Verify Razorpay signature
        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid payment signature",
                },
                { status: 400 }
            );
        }

        // 4. Read cart cookie
        const cookieStore = await cookies();
        const cartCookie = cookieStore.get("cart");

        if (!cartCookie) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cart is empty",
                },
                { status: 400 }
            );
        }

        const cart = JSON.parse(cartCookie.value);

        if (!Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cart is empty",
                },
                { status: 400 }
            );
        }

        // 5. Rebuild order items from PRODUCTS
        const orderItems = [];

        for (const item of cart) {
            const product = PRODUCTS.find(
                (p) => p.id === item.productId
            );

            if (!product) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Product not found: ${item.productId}`,
                    },
                    { status: 400 }
                );
            }

            orderItems.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                size: item.size,
            });
        }

        // 6. Recalculate total on backend
        const total = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // 7. Save order
        await connectDB();

        const order = await Order.create({
            user: session.user.id,

            items: orderItems,

            shippingAddress,

            totalAmount: total,

            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,

            paymentStatus: "completed",
        });

        const loyaltyPointsEarned = Math.floor(total / 10);

        await User.findByIdAndUpdate(session.user.id, {
            $inc: { loyaltyPoints: loyaltyPointsEarned },
        });

        // 8. Clear cart
        cookieStore.delete("cart");

        return NextResponse.json({
            success: true,
            message: "Order Placed Successfully",
            orderId: order._id,
        });


    } catch (error) {
        console.error("PAYMENT SUCCESS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create order",
            },
            { status: 500 }
        );
    }
}