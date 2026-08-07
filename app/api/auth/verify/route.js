import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import connectDB from "@/lib/db/connect";
import User from "@/models/users";

export async function POST(request) {
  await connectDB();

  const { otp } = await request.json();

  if (!otp) {
    return Response.json(
      {
        success: false,
        message: "OTP is required.",
      },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const email = cookieStore.get("verification_email")?.value;

  if (!email) {
    return Response.json(
      {
        success: false,
        message: "Verification session expired.",
      },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  if (!user || !user.otp) {
    return Response.json(
      {
        success: false,
        message: "OTP expired or not found.",
      },
      { status: 404 }
    );
  }

  if (user.otpExpiry < new Date()) {
    return Response.json(
      {
        success: false,
        message: "OTP has expired.",
      },
      { status: 400 }
    );
  }

  const isValid = await bcrypt.compare(otp, user.otp);

  if (!isValid) {
    return Response.json(
      {
        success: false,
        message: "Invalid OTP.",
      },
      { status: 400 }
    );
  }

  if (user.otpPurpose === "email-verification") {
    await User.updateOne(
      { email },
      {
        $set: {
          emailVerified: true,
        },
        $unset: {
          otp: "",
          otpExpiry: "",
          otpPurpose: "",
        },
      }
    );

    cookieStore.delete("verification_email");

    return Response.json({
      success: true,
      purpose: "email-verification",
      redirectTo: "/login",
      message: "Email verified successfully.",
    });
  }

  if (user.otpPurpose === "password-reset") {

    cookieStore.set("password_reset_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 10, // 10 mins
    });

    await User.updateOne(
      { email },
      {
        $unset: {
          otp: "",
          otpExpiry: "",
          otpPurpose: "",
        },
      }
    );

    cookieStore.delete("verification_email");

    return Response.json({
      success: true,
      purpose: "password-reset",
      redirectTo: "/newpassword",
      message: "OTP verified.",
    });

  } else {
    return Response.json(
      {
        success: false,
        message: "Invalid OTP purpose.",
      },
      { status: 400 }
    );
  
  }
}