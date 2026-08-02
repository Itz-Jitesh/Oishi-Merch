import User from "@/models/users";
import connectDB from "@/lib/db/connect";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt/generateToken";
export async function POST(request) {

    const { email, password} = await request.json();

    await connectDB();

    if (!email || !password) {
        return Response.json(
            {
                success: false,
                message: "Email and password are required."
            },
            {
                status: 400
            }
        );
    }

    const user = await User.findOne({ email });


    if (!user) {
        return Response.json(
            {
                success: false,
                message: "Invalid email or password."
            },
            {
                status: 401
            }
        );

    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return Response.json(
            {
                success: false,
                message: "Invalid email or password."
            },
            {
                status: 401,
            }
        );
    }

    const token = generateToken(user._id.toString());

    (await cookies()).set("token", token, {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        path: "/",

        maxAge: 60 * 60 * 24 * 7,

    });

    return Response.json(
        {
            success: true,
            message: "Login successful.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                emailVerified: user.emailVerified,
                role: user.role,
            },
        },
        {
            status: 200,
        }
    );
}