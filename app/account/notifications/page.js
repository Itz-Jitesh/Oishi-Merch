"use client";

import { useState } from "react";

const SETTINGS = [
  { key: "drops", label: "New drops", desc: "Get notified the moment a capsule goes live." },
  { key: "restock", label: "Restocks", desc: "When something you wishlisted comes back." },
  { key: "orders", label: "Order updates", desc: "Shipping, delivery, and returns." },
  { key: "news", label: "Newsletter", desc: "Studio stories and behind-the-scenes." },
];

export default function NotificationsPage() {
  const [state, setState] = useState({ drops: true, restock: true, orders: true, news: false });
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl">Notifications</h2>
      {SETTINGS.map((s) => (
        <div key={s.key} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
          <div>
            <p className="font-medium">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
          <button
            onClick={() => setState((v) => ({ ...v, [s.key]: !v[s.key] }))}
            className={`relative h-6 w-11 rounded-full transition ${state[s.key] ? "bg-primary" : "bg-border"}`}
            aria-label={s.label}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition ${state[s.key] ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
      ))}
    </div>
  );
}
