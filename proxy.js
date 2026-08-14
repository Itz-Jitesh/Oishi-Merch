import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const secureCookie =
    process.env.VERCEL === "1" || req.url.startsWith("https://");

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    secureCookie,
  });

  if (!token) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  return NextResponse.next();
}

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