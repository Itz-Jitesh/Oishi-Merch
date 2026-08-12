import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req) {
    const cookieStore = await cookies();

    const cartCookie = cookieStore.get("cart");
    const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

    const { id, size } = await req.json();

    const updatedCart = cart.filter(
        (item) => !(item.productId === id && item.size === size)
    );

    const response = NextResponse.json({
        message: "Item removed from cart",
    });

    response.cookies.set("cart", JSON.stringify(updatedCart), {
        path: "/",
    });

    return response;
}