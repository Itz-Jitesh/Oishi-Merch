"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const update = async (id, size, delta) => {
    const response = await fetch(`/api/cart/update`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, size, delta }),
    });

    if (!response.ok) return;

    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  useEffect(() => {
    const loadCart = async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) return;
      const data = await response.json();
      setItems(data.items);
    };
    loadCart();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    router.push("/checkout");
  }

  const remove = async (id, size) => {
    const response = await fetch(`/api/cart/delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id , size }),
    });
    if (!response.ok) return;
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.size === size)));
    toast.success("Item removed from cart.");
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 0;
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
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)] sm:gap-4"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-24 sm:w-24">
                  {i.images?.[0] ? (
                    <img
                      src={i.images[0]}
                      alt={i.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium text-foreground">{i.name}</h3>
                      <p className="text-xs capitalize text-muted-foreground">
                        {i.category} {i.size && `• Size: ${i.size.toUpperCase()}`}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(i.id, i.size)}
                      className="p-2 text-muted-foreground hover:text-primary"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        onClick={() => update(i.id, i.size, -1)}
                        className="p-2 text-foreground hover:text-primary"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-6 text-center text-sm">{i.qty}</span>
                      <button
                        onClick={() => update(i.id, i.size, 1)}
                        className="p-2 text-foreground hover:text-primary"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold text-primary">
                      ₹{(i.price * i.qty).toFixed(2)}
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
                  <dd className="text-foreground">₹{subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="text-foreground">
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </dd>
                </div>
                <div className="my-3 border-t border-border" />
                <div className="flex justify-between text-base">
                  <dt className="font-medium text-foreground">Total</dt>
                  <dd className="font-display text-xl text-primary">₹{total.toFixed(2)}</dd>
                </div>
              </dl>
              <button
                onClick={(e) => handleCheckout(e)}
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
