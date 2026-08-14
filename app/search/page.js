"use client";

import { Suspense, useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES } from "@/data/product";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort = searchParams.get("sort") || "popular";
  const collection = searchParams.get("collection") || "";
  const sale = searchParams.get("sale") || "";
  const occasion = searchParams.get("occasion") || "";
  const theme = searchParams.get("theme") || "";

  const [query, setQuery] = useState(initialQ);
  const [selected, setSelected] = useState(initialCategory ? [initialCategory] : []);
  const [price, setPrice] = useState(150);
  const [sort, setSort] = useState(initialSort);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggle = (c) =>
    setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  useEffect(() => {
    let cancelled = false;

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selected.length > 0) params.set("category", selected.join(","));
    if (price) params.set("maxPrice", String(price));
    if (sort) params.set("sort", sort);

    setLoading(true);
    fetch(`/api/search?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : { results: [] }))
      .then((data) => {
        if (cancelled) return;
        setResults(data.results || []);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, selected, price, sort]);

  const activeFilters = [
    collection && `Collection: ${collection}`,
    sale === "true" && "On sale",
    occasion && `Occasion: ${occasion}`,
    theme && `Theme: ${theme}`,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-[var(--shadow-card)]">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for tees, hoodies, kicks..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-border bg-card px-4 py-3 text-sm"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {activeFilters.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <span key={f} className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground">
                {f}
              </span>
            ))}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[220px_1fr_180px]">
          <aside className="space-y-6">
            <div>
              <h2 className="mb-3 font-display text-lg">Search Filters</h2>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Category</p>
              <div className="mt-2 space-y-2">
                {CATEGORIES.map((c) => (
                  <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selected.includes(c.name)}
                      onChange={() => toggle(c.name)}
                      className="accent-[color:var(--primary)]"
                    />
                    <span className="capitalize">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Max price: ₹{price}
              </p>
              <input
                type="range"
                min={20}
                max={150}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-2 w-full accent-[color:var(--primary)]"
              />
            </div>
          </aside>

          <section className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {loading ? (
              <p className="col-span-full py-12 text-center text-muted-foreground">
                Loading products…
              </p>
            ) : results.length === 0 ? (
              <p className="col-span-full py-12 text-center text-muted-foreground">
                No products match your filters.
              </p>
            ) : (
              results.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div
                className="flex aspect-[3/5] flex-col justify-between rounded-2xl p-4 text-background shadow-[var(--shadow-card)]"
                style={{ background: "var(--gradient-hero, linear-gradient(160deg, var(--primary), var(--accent)))" }}
              >
                <span className="text-xs uppercase tracking-widest">Drop 04</span>
                <div>
                  <h3 className="font-display text-xl leading-tight">Spirit Realm capsule</h3>
                  <p className="mt-1 text-xs opacity-90">Limited 200 pieces</p>
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

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  );
}
