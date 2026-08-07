import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import transporter from "@/lib/mailer";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required.",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: true,
                message: "If an account exists, we've sent a verification code.",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.otpPurpose = "password-reset";

        await user.save();

        const cookieStore = await cookies();
        cookieStore.set("verification_email", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        await transporter.sendMail({
            to: user.email,
            subject: "Reset your Oishi Merch password",
            text: `You requested to reset your Oishi Merch password.

Your password reset code is: ${otp}

This code expires in 10 minutes.

If you didn't request this, you can safely ignore this email.`,

            html: `
        <h2>Reset your Oishi Merch password</h2>

        <p>You requested to reset your password.</p>

        <p>Your password reset code is:</p>

        <h1 style="letter-spacing: 6px;">${otp}</h1>

        <p>This code expires in <strong>10 minutes</strong>.</p>

        <p>If you didn't request a password reset, you can safely ignore this email.</p>
    `,
        });
        return NextResponse.json({
            success: true,
            message: "If an account exists, we've sent a verification code.",
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}