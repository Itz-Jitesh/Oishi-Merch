"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-2xl">Profile</h2>
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-xl text-primary-foreground">A</div>
        <Button variant="outline" className="rounded-full">Change photo</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="First name" defaultValue="Ada" />
        <Input placeholder="Last name" defaultValue="Lovelace" />
        <Input placeholder="Email" defaultValue="ada@oishimerch.co" />
        <Input placeholder="Phone" defaultValue="+81 555 0110" />
      </div>
      <Button type="submit" className="rounded-full">Save changes</Button>
    </form>
  );
}
