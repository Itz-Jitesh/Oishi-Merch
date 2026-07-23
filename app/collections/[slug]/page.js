"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function CollectionDetail() {
  const { slug } = useParams();
  const items = PRODUCTS.slice(0, 8);
  return (
    <PageShell wide>
      <div
        className="mb-8 rounded-3xl p-10 text-background shadow-[var(--shadow-card)]"
        style={{ background: "linear-gradient(160deg,var(--primary),var(--accent))" }}
      >
        <p className="text-xs uppercase tracking-widest opacity-80">Collection</p>
        <h1 className="mt-2 font-display text-4xl capitalize">{slug.replace(/-/g, " ")}</h1>
        <p className="mt-2 max-w-lg text-sm opacity-90">
          A curated capsule shaped around a single mood. Limited runs, ships fast.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <ProductCard product={p} />
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
