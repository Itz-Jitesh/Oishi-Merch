"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Products</h1>
        <Link href="/admin/products/new">
          <Button className="rounded-full"><Plus className="mr-1 h-4 w-4" /> New product</Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg" style={{ background: p.color }} />
                    {p.name}
                  </div>
                </td>
                <td className="p-4 capitalize text-muted-foreground">{p.category}</td>
                <td className="p-4">${p.price}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-primary hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
