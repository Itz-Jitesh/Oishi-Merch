"use client";

import Link from "next/link";
import { ORDERS } from "@/lib/products";

export default function AccountOrdersPage() {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl">Order history</h2>
      {ORDERS.map((o) => (
        <Link
          key={o.id}
          href={`/orders/${o.id}`}
          className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-primary"
        >
          <div>
            <p className="font-medium">{o.id}</p>
            <p className="text-xs text-muted-foreground">{o.date} · {o.items} items · {o.status}</p>
          </div>
          <p className="font-display text-primary">${o.total.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
}
