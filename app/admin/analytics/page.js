"use client";

const BARS = [42, 58, 39, 71, 62, 88, 74, 55, 90, 68, 79, 96];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Sessions", v: "24.1k" },
          { l: "Conversion", v: "3.8%" },
          { l: "Avg order", v: "$56.20" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.l}</p>
            <p className="mt-2 font-display text-2xl">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-xl">Revenue (12mo)</h2>
        <div className="mt-6 flex h-48 items-end gap-2">
          {BARS.map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-primary/70 transition hover:bg-primary" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
