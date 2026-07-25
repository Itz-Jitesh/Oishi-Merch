"use client";

import { PRODUCTS } from "@/data/product";

export default function AdminInventory() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Inventory</h1>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="p-4">SKU</th><th className="p-4">Product</th><th className="p-4">Stock</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => {
              const stock = ((i * 17) % 60) + 2;
              const low = stock < 10;
              return (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-4 font-mono text-xs">{p.id.toUpperCase()}</td>
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{stock}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${low ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                      {low ? "Low" : "In stock"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
