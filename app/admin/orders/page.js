"use client";

const ORDERS = [
  { id: "OM-1052", customer: "mika@…", total: 128, status: "Processing" },
  { id: "OM-1051", customer: "devon@…", total: 74, status: "Shipped" },
  { id: "OM-1050", customer: "aisha@…", total: 210, status: "Delivered" },
  { id: "OM-1049", customer: "ren@…", total: 46, status: "Delivered" },
];

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Orders</h1>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-4 font-medium">{o.id}</td>
                <td className="p-4 text-muted-foreground">{o.customer}</td>
                <td className="p-4">${o.total}</td>
                <td className="p-4"><span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
