import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = await cookies();

    const cartCookie = cookieStore.get("cart");
    const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

    const { id, size, quantity } = await req.json();

    const existingItemIndex = cart.findIndex(
        (item) => item.productId === id && item.size === size
    );

    if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // If the item doesn't exist, add it to the cart
        cart.push({ productId: id, quantity: quantity, size });
    }

    const updatedCart = JSON.stringify(cart);
    // console.log("Updated Cart:", updatedCart);
    const response = NextResponse.json({ message: `Item added to cart` });
    response.cookies.set("cart", updatedCart, { path: "/" });

    return response;
}