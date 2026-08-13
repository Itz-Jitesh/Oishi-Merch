import User from "@/models/users";
import connectDB from "@/lib/db/connect"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import transporter from "@/lib/mailer";

export async function POST(request) {
    await connectDB();
    const { username, email, password } = await request.json()
    if (!username || !email || !password) {
        return Response.json(
            {
                success: false,
                message: "All fields are required.",
            },
            {
                status: 400,
            }
        );
    }
    const existingUser = await User.findOne({
        email,
    });
    if (existingUser) {
        return Response.json(
            {
                success: false,
                message: "Invalid credentials. Please try again.",
            },
            {
                status: 409,
            }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        ordersCount: 0,
        wishlistCount: 0,
        loyaltyPoints: 0,
    });

const cookieStore = await cookies();

const otp = Math.floor(100000 + Math.random() * 900000).toString();
const hashedOtp = await bcrypt.hash(otp, 10);

await User.updateOne(
  { email },
  {
    $set: {
      otp: hashedOtp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      otpPurpose: "email-verification",
    },
  }
);
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


cookieStore.set("verification_email", email, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 10 * 60,
  path: "/",
});



return Response.json(
    {
        success: true,
        message: "Account created successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    },
    {
        status: 201,
    }
);
}