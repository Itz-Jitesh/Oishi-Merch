"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/AuthCard";
import { useSearchParams } from "next/navigation";
const COPY = {
  signup: {
    title: "Email verified",
    message: "Your account is ready. Continue to start exploring Oishi Merch.",
  },
  "reset-password": {
    title: "Verification successful",
    message: "Your reset code has been verified successfully.",
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "reset-password" ? "reset-password" : "signup";
  const copy = COPY[mode] ?? COPY.signup;

  return (
    <AuthCard heading={copy.title} subheading={copy.message}>
      <div className="flex justify-center py-2">
        <div
          className="grid h-24 w-24 place-items-center rounded-full bg-secondary text-foreground"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <Check size={48} strokeWidth={3} />
        </div>
      </div>

      <Button asChild className="w-full rounded-xl">
        <Link href="/">Continue</Link>
      </Button>
    </AuthCard>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
