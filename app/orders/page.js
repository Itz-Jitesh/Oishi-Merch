import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const ORDERS = [
  { id: "OM-1042", date: "2026-07-14", status: "Delivered", total: 128.5, items: 3 },
  { id: "OM-1039", date: "2026-06-30", status: "Shipped", total: 74.0, items: 2 },
  { id: "OM-1021", date: "2026-06-11", status: "Processing", total: 210.99, items: 5 },
];

export { ORDERS };

export default function OrdersPage() {
  return (
    <PageShell title="Your Orders" subtitle="Every drop you've made a home for.">
      <div className="space-y-3">
        {ORDERS.map((o) => (
          <Link
            key={o.id}
            href={`/orders/${o.id}`}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:border-primary"
          >
            <div>
              <p className="font-medium text-foreground">{o.id}</p>
              <p className="text-xs text-muted-foreground">
                {o.date} · {o.items} items
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-lg text-primary">${o.total.toFixed(2)}</p>
              <span className="text-xs uppercase tracking-wide text-muted-foreground">{o.status}</span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
