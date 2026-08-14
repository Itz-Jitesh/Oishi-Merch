"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { COLLECTIONS, PRODUCTS } from "@/data/product";

export default function CollectionDetail() {
  const { slug } = useParams();

  const collection = COLLECTIONS.find((c) => c.slug === slug);

  const items = collection
    ? PRODUCTS.filter((product) =>
        collection.productIds.includes(product.id)
      )
    : [];

  return (
    <PageShell wide>
      <div
        className="mb-8 rounded-3xl p-10 text-background shadow-[var(--shadow-card)]"
        style={{
          background: "linear-gradient(160deg,var(--primary),var(--accent))",
        }}
      >
        <p className="text-xs uppercase tracking-widest opacity-80">
          Collection
        </p>

        <h1 className="mt-2 font-display text-4xl">
          {collection?.name}
        </h1>

        <p className="mt-2 max-w-lg text-sm opacity-90">
          {collection?.desc}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {items.map((p) => (
            <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  );
}