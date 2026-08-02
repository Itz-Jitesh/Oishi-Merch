import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            await connectDB();

            if (account?.provider === "google") {
                const existingUser = await User.findOne({
                    email: user.email,
                });

                if (!existingUser) {
                    await User.create({
                        username: user.name,
                        email: user.email,
                        image: user.image,
                        password: null,
                        provider: "google",
                        emailVerified: true,
                    });
                }
            }
            Credentials({
                async authorize(credentials) {
                    const { email, password } = await request.json();

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

                }
            })

            return true;
        },
    },

    session: {
        strategy: "jwt",
    },
});