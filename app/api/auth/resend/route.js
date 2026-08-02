import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import transporter from "@/lib/mailer";

export async function POST() {
  await connectDB();

  const cookieStore = await cookies();
  const email = cookieStore.get("verification_email")?.value;

  if (!email) {
    return Response.json(
      {
        success: false,
        message: "Verification session expired.",
      },
      {
        status: 400,
      }
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "User not found.",
      },
      {
        status: 404,
      }
    );
  }

  if (user.emailVerified) {
    return Response.json(
      {
        success: false,
        message: "Email is already verified.",
      },
      {
        status: 400,
      }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = hashedOtp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  user.otpPurpose = "email-verification";

  await user.save();

  await transporter.sendMail({
  to: email,
  subject: "Verify your Oishi Merch account",
  text: `Your verification code is ${otp}. This code expires in 10 minutes.`,
  html: `
    <h2>Verify your Oishi Merch account</h2>
    <p>Your verification code is:</p>
    <h1>${otp}</h1>
    <p>This code expires in <strong>10 minutes</strong>.</p>
  `,
});  

  return Response.json(
    {
      success: true,
      message: "A new verification code has been sent.",
    },
    {
      status: 200,
    }
  );
}