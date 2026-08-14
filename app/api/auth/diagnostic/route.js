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

    const report = {
        verdict: "",
        authSecret: secretInfo("AUTH_SECRET"),
        nextAuthSecret: secretInfo("NEXTAUTH_SECRET"),
        secretsConflict: Boolean(
            authSecret && nextAuthSecret && authSecret !== nextAuthSecret
        ),
        effectiveSecretTooShort:
            effectiveSecret != null && effectiveSecret.length < 32,
        nextauthUrl: process.env.NEXTAUTH_URL || "NOT SET",
        authUrl: process.env.AUTH_URL || "NOT SET",
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

    if (effectiveSecret == null) {
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
