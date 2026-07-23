"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewProduct() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/products" className="text-sm text-primary hover:underline">← Products</Link>
        <h1 className="mt-2 font-display text-3xl">New product</h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <Input placeholder="Product name" />
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Price" type="number" />
          <Input placeholder="Category" />
        </div>
        <textarea rows={5} placeholder="Description" className="w-full rounded-xl border border-input bg-background p-3 text-sm" />
        <Button className="w-full rounded-full">Create product</Button>
      </form>
    </div>
  );
}
