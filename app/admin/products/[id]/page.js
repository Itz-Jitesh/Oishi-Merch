"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/products";

export default function EditProduct() {
  const { id } = useParams();
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) {
    return (
      <div>
        <Link href="/admin/products" className="text-sm text-primary hover:underline">← Products</Link>
        <p className="mt-4 text-muted-foreground">Product not found.</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link href="/admin/products" className="text-sm text-primary hover:underline">← Products</Link>
        <h1 className="mt-2 font-display text-3xl">Edit product</h1>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <Input defaultValue={p.name} />
        <div className="grid grid-cols-2 gap-4">
          <Input defaultValue={p.price} type="number" />
          <Input defaultValue={p.category} />
        </div>
        <textarea rows={5} defaultValue="Premium heavyweight fabric with a soft hand-feel." className="w-full rounded-xl border border-input bg-background p-3 text-sm" />
        <div className="flex gap-3">
          <Button className="flex-1 rounded-full">Save</Button>
          <Button variant="outline" className="rounded-full">Delete</Button>
        </div>
      </form>
    </div>
  );
}
