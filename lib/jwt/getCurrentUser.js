import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt/verifyToken";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";

export async function getCurrentUser() {
  // Get JWT from cookie
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    // Verify JWT
    const decoded = verifyToken(token);

    // Connect to DB
    await connectDB();

    // Fetch fresh user from DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}