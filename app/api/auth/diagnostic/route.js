import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

function secretInfo(name) {
    const v = process.env[name];
    if (!v) return "NOT SET";
    return `set (length ${v.length})`;
}

function redactUri(uri) {
    try {
        const u = new URL(uri);
        return `${u.protocol}//${u.host}`;
    } catch {
        return "unparseable (NOT a valid URL)";
    }
}

export async function GET() {
const authSecret = process.env.AUTH_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
const effectiveSecret = authSecret ?? nextAuthSecret;
const nextauthUrl = process.env.NEXTAUTH_URL || "";
const authUrl = process.env.AUTH_URL || "";
const pointsAtLocalhost = /localhost|127\.0\.0\.1/.test(nextauthUrl) || /localhost|127\.0\.0\.1/.test(authUrl);

const report = {
    verdict: "",
    authSecret: secretInfo("AUTH_SECRET"),
    nextAuthSecret: secretInfo("NEXTAUTH_SECRET"),
    secretsConflict: Boolean(
        authSecret && nextAuthSecret && authSecret !== nextAuthSecret
    ),
    effectiveSecretTooShort:
        effectiveSecret != null && effectiveSecret.length < 32,
    nextauthUrlPointsAtLocalhost: pointsAtLocalhost,
    nextauthUrl: nextauthUrl || "NOT SET",
    authUrl: authUrl || "NOT SET",
    authTrustHost: process.env.AUTH_TRUST_HOST || "NOT SET",
    vercel: process.env.VERCEL || "NOT SET",
    vercelEnv: process.env.VERCEL_ENV || "NOT SET",
    vercelUrl: process.env.VERCEL_URL || "NOT SET",
    googleClientId: process.env.GOOGLE_CLIENT_ID ? "set" : "NOT SET",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? "set" : "NOT SET",
    mongodbUri: process.env.MONGODB_URI
        ? redactUri(process.env.MONGODB_URI)
        : "NOT SET",
    db: "not attempted",
};

if (pointsAtLocalhost) {
    report.verdict =
        "NEXTAUTH_URL/AUTH_URL points at localhost while running on Vercel. After a " +
        "successful sign-in, NextAuth redirects the browser to http://localhost:3000, which " +
        "cannot load in production, so login appears broken / never persists. Fix: DELETE " +
        "NEXTAUTH_URL (and AUTH_URL if present) from Vercel Settings -> Environment Variables " +
        "-> redeploy. Vercel derives the host automatically.";
} else if (effectiveSecret == null) {
        report.verdict =
            "AUTH_SECRET/NEXTAUTH_SECRET is MISSING. This is why login never persists — " +
            "NextAuth cannot create session cookies without it. Fix: Vercel -> Settings -> " +
            "Environment Variables -> add AUTH_SECRET (openssl rand -base64 32) -> redeploy.";
    } else if (effectiveSecret.length < 32) {
        report.verdict =
            `Effective secret is only ${effectiveSecret.length} chars; NextAuth v5 needs >= 32. ` +
            "Fix: replace it with: openssl rand -base64 32, then redeploy.";
    } else if (report.secretsConflict) {
        report.verdict =
            "AUTH_SECRET and NEXTAUTH_SECRET are BOTH set and DIFFERENT. Remove one so both " +
            "runtime and middleware use the same value, then redeploy.";
    } else {
        report.verdict =
            "Secrets look OK (set, >= 32 chars, consistent). If login still fails, the cause " +
            "is elsewhere (NEXTAUTH_URL / cookies / DB).";
    }

    if (process.env.MONGODB_URI) {
        try {
            await connectDB();
            report.db =
                mongoose.connection.readyState === 1
                    ? "CONNECTED"
                    : `state ${mongoose.connection.readyState}`;
        } catch (err) {
            report.db = `FAILED: ${err.message}`;
        }
    }

    return NextResponse.json(report);
}
