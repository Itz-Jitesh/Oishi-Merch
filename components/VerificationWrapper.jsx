"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthCard } from "./AuthCard";
import { OtpInput } from "./OtpInput";
import { toast } from "sonner";


const COPY = {
  signup: {
    heading: "Verify your email",
    subheading: "Enter the 6-digit code we sent to your email to finish creating your account.",
  },
  "reset-password": {
    heading: "Verify reset code",
    subheading: "Enter the 6-digit reset code sent to your email.",
  },
};

export function VerificationWrapper({ mode = "signup", email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const copy = COPY[mode] ?? COPY.signup;

  const handleVerify = async () => {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otp.join(""),
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    if (data.purpose === "email-verification") {
      router.push("/auth/login");
    } else if (data.purpose === "password-reset") {
      router.push("/auth/new-password");
    }

  };

  const handleResend = async () => {
    const response = await fetch("/api/auth/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otp.join(""),
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <AuthCard
      heading={copy.heading}
      subheading={copy.subheading}
      footer={
        <>
          Didn't get a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-primary hover:underline"
          >
            Resend code
          </button>
        </>
      }
    >
      <OtpInput value={otp} onChange={setOtp} />

      <Button onClick={handleVerify} className="w-full rounded-xl">
        Verify
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/auth/login" className="hover:text-foreground">
          ← Back to login
        </Link>
      </p>
    </AuthCard>
  );
}
