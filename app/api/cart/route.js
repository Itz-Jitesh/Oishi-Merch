import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/product";
import { cookies } from "next/headers";

export async function GET() {

    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("cart");
    const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

    const items = cart.map((e) => {
        const product = PRODUCTS.find((p) => p.id === e.productId);
        return {
            ...product,
            qty: e.quantity,
            size: e.size,
        };
    });

    return NextResponse.json({ items });
}
