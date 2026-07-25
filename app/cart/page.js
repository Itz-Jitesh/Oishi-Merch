"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PRODUCTS } from "@/data/product";

export default function CartPage() {
  const [items, setItems] = useState(
    PRODUCTS.slice(0, 4).map((p) => ({ ...p, qty: 1 })),
  );

  const update = (id, delta) =>
    setItems((arr) =>
      arr
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );
  const remove = (id) => setItems((arr) => arr.filter((i) => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 75 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 font-display text-3xl text-foreground md:text-4xl">Your Cart</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* items */}
          <section className="space-y-4">
            {items.length === 0 && (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <p className="text-muted-foreground">Your cart is empty.</p>
                <Link
                  href="/products"
                  className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
                >
                  Shop products
                </Link>
              </div>
            )}
            {items.map((i) => (
              <article
                key={i.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
              >
                <div
                  className="h-24 w-24 shrink-0 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${i.color}, var(--background))` }}
                />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-foreground">{i.name}</h3>
                      <p className="text-xs capitalize text-muted-foreground">{i.category}</p>
                    </div>
                    <button
                      onClick={() => remove(i.id)}
                      className="text-muted-foreground hover:text-primary"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        onClick={() => update(i.id, -1)}
                        className="p-2 text-foreground hover:text-primary"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm">{i.qty}</span>
                      <button
                        onClick={() => update(i.id, 1)}
                        className="p-2 text-foreground hover:text-primary"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold text-primary">
                      ${(i.price * i.qty).toFixed(2)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* summary */}
          <aside>
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-xl text-foreground">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="text-foreground">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="text-foreground">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                <div className="my-3 border-t border-border" />
                <div className="flex justify-between text-base">
                  <dt className="font-medium text-foreground">Total</dt>
                  <dd className="font-display text-xl text-primary">${total.toFixed(2)}</dd>
                </div>
              </dl>
              <button
                onClick={(e) => e.preventDefault()}
                disabled={items.length === 0}
                className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 disabled:opacity-50"
              >
                Proceed to Pay
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Taxes calculated at checkout · Free returns within 30 days
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
