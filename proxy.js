import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/account/:path*",
    "/checkout/:path*",
    "/admin/:path*",
    "/order/:path*",
    "/wishlist/:path*",
    "/cart/:path*",
  ],
};