"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ShieldCheck, Lock } from "lucide-react";

export default function SecurityPage() {
  const { data: session, status } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/account/security", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      toast.success("Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="h-6 w-48 animate-pulse rounded bg-muted"></div>
          <div className="mt-4 h-10 w-full animate-pulse rounded bg-muted"></div>
        </div>
      </div>
    );
  }

  const isGoogleUser = session?.user?.provider === "google";

  if (isGoogleUser) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Account Security</h2>
              <p className="text-sm text-muted-foreground">Authentication Method</p>
            </div>
          </div>
          <div className="rounded-xl bg-muted/50 p-4 text-sm border border-border/50 space-y-1">
            <p className="font-medium text-foreground">Logged in through Google</p>
            <p className="text-muted-foreground">
              Your account is authenticated via Google ({session?.user?.email}). Password changes are managed directly through your Google Account and cannot be modified here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleChangePassword} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-4 w-4" />
          </div>
          <h2 className="font-display text-2xl font-semibold">Change password</h2>
        </div>
        <Input 
          type="password" 
          placeholder="Current password" 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input 
          type="password" 
          placeholder="New password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input 
          type="password" 
          placeholder="Confirm new password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isSubmitting} className="rounded-full">
          {isSubmitting ? "Updating..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}



