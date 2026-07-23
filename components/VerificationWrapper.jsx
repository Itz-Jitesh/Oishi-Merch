"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthCard } from "./AuthCard";
import { OtpInput } from "./OtpInput";

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

export function VerificationWrapper({ mode = "signup" }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const copy = COPY[mode] ?? COPY.signup;

  const handleVerify = () => {
    // TODO
  };

  const handleResend = () => {
    // TODO
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
      <OtpInput value={digits} onChange={setDigits} />

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
