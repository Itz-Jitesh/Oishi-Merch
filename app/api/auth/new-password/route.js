import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request) {
    try {
        const cookieStore = await cookies();

        const email = cookieStore.get("password_reset_email")?.value;

        const { password } = await request.json();

        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password reset session expired.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password is required.",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                {
                    status: 404,
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.otpPurpose = undefined;

        await user.save();

        cookieStore.delete("password_reset_email");

        return NextResponse.json({
            success: true,
            message: "Password reset successfully. You can now log in with your new password.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again.",
            },
            {
                status: 500,
            }
        );
    }
}   