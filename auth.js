import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "@/lib/db/connect";
import User from "@/models/users";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const authSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
const authUrl = process.env.NEXTAUTH_URL ?? process.env.AUTH_URL;

if (!authSecret) {
    console.error(
        "[auth] FATAL: AUTH_SECRET / NEXTAUTH_SECRET is NOT set. " +
            "Session cookies cannot be created, so no login will persist. " +
            "Set it in Vercel → Settings → Environment Variables, then redeploy."
    );
} else if (authSecret.length < 32) {
    console.error(
        "[auth] FATAL: AUTH_SECRET is only " + authSecret.length + " characters. " +
            "NextAuth v5 cannot encrypt session JWTs with a secret shorter than 32 chars. " +
            "Generate a strong one with: openssl rand -base64 32"
    );
}

if (
    authUrl &&
    /localhost|127\.0\.0\.1/.test(authUrl) &&
    process.env.VERCEL === "1"
) {
    console.error(
        "[auth] FATAL: NEXTAUTH_URL / AUTH_URL is '" + authUrl + "' while running on Vercel. " +
            "After sign-in, NextAuth redirects the browser there and login appears to fail. " +
            "Delete NEXTAUTH_URL (and AUTH_URL) from Vercel Settings → Environment Variables " +
            "and redeploy; Vercel derives the host automatically."
    );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: authSecret,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),


        Credentials({

            name: "credentials",

            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    await connectDB();
                } catch (err) {
                    console.error("[auth][authorize] connectDB failed:", err.message);
                    return null;
                }

                const email = String(credentials?.email || "")
                    .trim()
                    .toLowerCase();
                const password = credentials?.password || "";

                if (!email || !password) {
                    console.log("[auth][authorize] missing email or password");
                    return null;
                }

                let user;
                try {
                    user = await User.findOne({ email });
                    console.log(
                        "[auth][authorize] user lookup:",
                        email,
                        user ? "FOUND" : "NOT FOUND"
                    );
                } catch (err) {
                    console.error("[auth][authorize] user lookup error:", err);
                    return null;
                }

                if (!user) {
                    return null;
                }

                if (!user.password) {
                    console.log("[auth][authorize] user has no password stored");
                    return null;
                }

                let isMatch = false;
                try {
                    isMatch = await bcrypt.compare(password, user.password);
                    console.log("[auth][authorize] password match:", isMatch);
                } catch (err) {
                    console.error("[auth][authorize] bcrypt.compare error:", err);
                    return null;
                }

                if (!isMatch) {
                    return null
                }

                return {
                    id: user._id.toString(),
                    name: user.username,
                    email: user.email,
                    image: user.image,
                    role: user.role,
                    provider: user.provider,        
                    emailVerified: user.emailVerified,
                };

            },

        }),
    ],  

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.provider = user.provider;
                token.emailVerified = user.emailVerified;
            }

            return token;
        },

        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.provider = token.provider;
            session.user.emailVerified = token.emailVerified;

            return session;
        },

        async signIn({ user, account }) {
            await connectDB();

            if (account?.provider === "google") {
                let dbUser = await User.findOne({
                    email: user.email,
                });

                if (!dbUser) {
                    dbUser = await User.create({
                        username: user.name,
                        email: user.email,
                        image: user.image,
                        password: null,
                        provider: "google",
                        emailVerified: true,
                        ordersCount: 0,
                        wishlistCount: 0,
                        loyaltyPoints: 0,
                    });
                }

                user.id = dbUser._id.toString();
                user.role = dbUser.role;
                user.provider = dbUser.provider;
                user.emailVerified = dbUser.emailVerified;
            }

            return true;
        },
    },

    session: {
        strategy: "jwt",
    },
});

