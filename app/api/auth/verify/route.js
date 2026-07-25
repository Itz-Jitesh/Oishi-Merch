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

  // Optional if you're already using a TTL index
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

  return Response.json(
    {
      success: true,
      message: "Email verified successfully.",
    },
    {
      status: 200,
    }
  );
}