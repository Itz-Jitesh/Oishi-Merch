export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Welcome back</p>
        <h2 className="mt-1 font-display text-2xl">Ada Lovelace</h2>
        <p className="text-sm text-muted-foreground">ada@oishimerch.co</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Orders", v: "12" },
          { l: "Loyalty pts", v: "480" },
          { l: "Saved", v: "6" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5 text-center">
            <p className="font-display text-3xl text-primary">{s.v}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
