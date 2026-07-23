"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-3xl">Settings</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl">Store</h2>
        <Input defaultValue="Oishi Merch" placeholder="Store name" />
        <Input defaultValue="hello@oishimerch.co" placeholder="Support email" />
        <Input defaultValue="JPY" placeholder="Currency" />
        <Button className="rounded-full">Save</Button>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl">Shipping</h2>
        <Input defaultValue="75" placeholder="Free shipping threshold ($)" />
        <Input defaultValue="8" placeholder="Standard shipping ($)" />
        <Button className="rounded-full">Save</Button>
      </form>
    </div>
  );
}
