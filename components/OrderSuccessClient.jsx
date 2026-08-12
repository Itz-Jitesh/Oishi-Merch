"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Home } from "lucide-react";

import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const REDIRECT_SECONDS = 5;

export default function OrderSuccessClient() {
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = "/";
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const progress = ((REDIRECT_SECONDS - seconds) / REDIRECT_SECONDS) * 100;

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center py-16 md:py-24">
        <div className="w-full max-w-md animate-fade-in">
          <div
            className="rounded-2xl bg-card p-8 text-center md:p-10"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex justify-center">
              <div
                className="grid h-24 w-24 place-items-center rounded-full bg-secondary text-foreground animate-scale-in"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <Check size={48} strokeWidth={3} className="text-secondary-foreground" />
              </div>
            </div>

            <h1 className="mt-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Order placed!
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you for your order. We're preparing your items with care.
            </p>

            <div className="mt-8 rounded-xl bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground">
                Redirecting to home in{" "}
                <span className="font-display text-lg font-bold text-primary">{seconds}</span>{" "}
                second{seconds === 1 ? "" : "s"}
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8">
              <Button asChild className="w-full rounded-xl">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to home now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
