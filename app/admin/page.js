export default function AdminPage() {
  const stats = [
    { l: "Revenue (30d)", v: "$18,240", chg: "+12%" },
    { l: "Orders", v: "324", chg: "+8%" },
    { l: "Customers", v: "1,204", chg: "+21%" },
    { l: "Avg cart", v: "$56.20", chg: "+3%" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Dashboard</h1>
        <span className="text-sm text-muted-foreground">Today · Jul 23</span>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</p>
            <p className="mt-2 font-display text-2xl">{s.v}</p>
            <p className="mt-1 text-xs text-primary">{s.chg}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl">Recent activity</h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex justify-between border-b border-border pb-3"><span>New order #OM-1052</span><span className="text-muted-foreground">2m ago</span></li>
          <li className="flex justify-between border-b border-border pb-3"><span>Restock: Ronin Hoodie</span><span className="text-muted-foreground">1h ago</span></li>
          <li className="flex justify-between"><span>Customer signup: mika@…</span><span className="text-muted-foreground">3h ago</span></li>
        </ul>
      </div>
    </div>
  );
}
