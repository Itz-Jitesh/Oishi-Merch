"use client";

const CUSTOMERS = [
  { name: "Mika R.", email: "mika@…", orders: 4, total: 512 },
  { name: "Devon L.", email: "devon@…", orders: 2, total: 148 },
  { name: "Aisha K.", email: "aisha@…", orders: 7, total: 891 },
  { name: "Ren H.", email: "ren@…", orders: 1, total: 46 },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Customers</h1>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Orders</th><th className="p-4">Lifetime</th></tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.email} className="border-t border-border">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 text-muted-foreground">{c.email}</td>
                <td className="p-4">{c.orders}</td>
                <td className="p-4">${c.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
