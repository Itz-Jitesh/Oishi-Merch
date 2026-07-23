"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl">Change password</h2>
        <Input type="password" placeholder="Current password" />
        <Input type="password" placeholder="New password" />
        <Input type="password" placeholder="Confirm new password" />
        <Button className="rounded-full">Update password</Button>
      </form>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl">Two-factor auth</h2>
            <p className="mt-1 text-sm text-muted-foreground">Add an extra layer with an authenticator app.</p>
          </div>
          <Button variant="outline" className="rounded-full">Enable 2FA</Button>
        </div>
      </div>
    </div>
  );
}
