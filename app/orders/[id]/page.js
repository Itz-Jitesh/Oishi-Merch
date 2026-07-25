"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PRODUCTS } from "@/data/product";

export default function OrderDetail() {
  const { id } = useParams();
  const items = PRODUCTS.slice(0, 3);
  const subtotal = items.reduce((s, i) => s + i.price, 0);

  return (
    <PageShell title={`Order ${id}`} subtitle="Placed on Jul 14, 2026 · Delivered">
      <div className="mb-6">
        <Link href="/orders" className="text-sm text-primary hover:underline">← All orders</Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div
                className="h-16 w-16 rounded-xl"
                style={{ background: `linear-gradient(135deg,${p.color},var(--background))` }}
              />
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">Qty 1</p>
              </div>
              <p className="text-sm">${p.price}</p>
            </div>
          ))}
        </section>
        <aside className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg">Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>Free</dd></div>
            <div className="my-2 border-t border-border" />
            <div className="flex justify-between"><dt className="font-medium">Total</dt><dd className="font-display text-primary">${subtotal.toFixed(2)}</dd></div>
          </dl>
          <div className="mt-6 text-xs text-muted-foreground">
            Shipping to 123 Sakura Ave, Kyoto
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
