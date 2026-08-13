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
    </div>
  );
}
