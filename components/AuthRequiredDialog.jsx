"use client";

import Link from "next/link";
import { LogIn, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Popup shown when a signed-out visitor lands on a protected page.
 * It never redirects on its own — the visitor chooses to go to /auth/login.
 */
export function AuthRequiredDialog({
  open,
  onOpenChange,
  title = "You're not logged in",
  description = "Anything you do here won't be saved to an account. Please log in to continue.",
  redirectTo,
  onDismiss,
}) {
  const loginHref = redirectTo
    ? `/auth/login?redirect=${encodeURIComponent(redirectTo)}`
    : "/auth/login";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl border-border bg-card text-center">
        <DialogHeader className="items-center space-y-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </span>
          <DialogTitle className="font-display text-2xl text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-2">
          <Button asChild className="w-full rounded-full">
            <Link href={loginHref}>
              <LogIn className="mr-2 h-4 w-4" /> Log in to continue
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full rounded-full text-muted-foreground"
            onClick={() => {
              onDismiss?.();
              onOpenChange?.(false);
            }}
          >
            Keep browsing as guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthRequiredDialog;
