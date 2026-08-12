"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/data/product";

export default function ProductsPage() {
  const [active, setActive] = useState("all");
  const list = active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-6">
          <h1 className="font-display text-3xl text-foreground md:text-4xl">All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fresh drops curated for the fandom — restocked weekly.
          </p>
        </header>

        {/* category pill bar */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto rounded-full border border-border bg-card p-2 shadow-[var(--shadow-card)]">
          <button
            key="all"
            onClick={() => setActive("all")}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm capitalize transition ${active === "all"
                ? "bg-primary text-primary-foreground shadow"
                : "text-foreground hover:bg-secondary"
              }`}
          >
            All
          </button>

          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActive(category.name)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm capitalize transition ${active === category.name
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-foreground hover:bg-secondary"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_180px]">
          <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div
                className="flex aspect-[3/5] flex-col justify-between rounded-2xl p-4 text-foreground shadow-[var(--shadow-card)]"
                style={{ background: "linear-gradient(160deg, var(--secondary), var(--accent))" }}
              >
                <span className="text-xs uppercase tracking-widest">Member perk</span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Free patch on orders ₹75+</h3>
                  <Link
                    href="/cart"
                    className="mt-3 inline-block rounded-full bg-foreground px-4 py-1.5 text-xs text-background"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
