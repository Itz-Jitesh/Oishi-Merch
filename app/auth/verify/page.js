"use client";

import { Suspense } from "react";
import { VerificationWrapper } from "@/components/VerificationWrapper";
import { useSearchParams } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "reset-password" ? "reset-password" : "signup";
  return <VerificationWrapper mode={mode} />;
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyContent />
    </Suspense>
  );
}
