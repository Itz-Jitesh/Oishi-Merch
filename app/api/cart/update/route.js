import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = await cookies();

    const cartCookie = cookieStore.get("cart");
    const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

    const { id, size, delta } = await req.json();

    const existingItemIndex = cart.findIndex(
        (item) => item.productId === id && item.size === size
    );

    if (existingItemIndex !== -1) {
        // Update the existing item's quantity
        cart[existingItemIndex].quantity += delta;

        // Remove the item if quantity reaches 0
        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }
    } else {
        // If the item doesn't exist, add it to the cart
        cart.push({
            productId: id,
            quantity: delta,
            size,
        });
    }

    const updatedCart = JSON.stringify(cart);

    const response = NextResponse.json({
        message: "Cart updated",
    });

    response.cookies.set("cart", updatedCart, {
        path: "/",
    });

    return response;
}