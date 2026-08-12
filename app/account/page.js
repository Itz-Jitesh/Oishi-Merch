"use client";
import {useState,useEffect} from "react";


export default function AccountPage() {
const [overview, setOverview] = useState(null);

useEffect(() => {
  const fetchOverview = async () => {
    try {
      const response = await fetch("/api/account/overview");

      if (!response.ok) {
        throw new Error("Failed to fetch account overview");
      }

      const data = await response.json();

      setOverview(data);
    } catch (error) {
      console.error("Failed to fetch account overview:", error);
    }
  };

  fetchOverview();
}, []);

console.log("Account overview data:", overview);
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Welcome back</p>
        <h2 className="mt-1 font-display text-2xl">{overview?.user.name}</h2>
        <p className="text-sm text-muted-foreground">{overview?.user.email}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Orders", v: overview?.orders.count },

          { l: "Loyalty pts", v: overview?.loyaltyPoints },
          { l: "Saved", v: overview?.wishlistCount },
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
