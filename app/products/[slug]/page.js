"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, ShoppingBag, Truck, RotateCcw, Shield } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/product";

function ProductMissing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Product not found</h1>
        <p className="mt-2 text-muted-foreground">This piece isn't in the drop.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
        >
          Back to shop
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function PageError() {
  return <ProductMissing />;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.id === slug);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  if (!product) {
    return <ProductMissing />;
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link> /{" "}
          <Link href="/products" className="hover:text-primary">Products</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div
            className="aspect-square w-full rounded-3xl shadow-[var(--shadow-card)]"
            style={{ background: `linear-gradient(135deg, ${product.color}, var(--background))` }}
          />
          <section>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {product.category}
            </span>
            <h1 className="mt-2 font-display text-4xl text-foreground">{product.name}</h1>
            <p className="mt-3 font-display text-2xl text-primary">${product.price}</p>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Premium heavyweight fabric with a soft hand-feel. Screen-printed graphics inspired by
              beloved anime worlds. Ships within 48 hours.
            </p>

            <div className="mt-6">
              <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Size</p>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 w-12 rounded-full border text-sm transition ${
                      size === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2">−</button>
                <span className="min-w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
              </div>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow">
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </button>
              <button
                aria-label="Wishlist"
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <ul className="mt-8 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
              <li className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3 text-center">
                <Truck className="h-4 w-4 text-primary" /> Free ship $75+
              </li>
              <li className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3 text-center">
                <RotateCcw className="h-4 w-4 text-primary" /> 30-day returns
              </li>
              <li className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3 text-center">
                <Shield className="h-4 w-4 text-primary" /> Authentic drop
              </li>
            </ul>
          </section>
        </div>

        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
