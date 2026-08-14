"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/product";

export default function CategoryDetail() {
  const { slug } = useParams();
  const items = PRODUCTS.filter((p) => p.category === slug);
  return (
    <PageShell title={slug} subtitle={`${items.length} pieces in ${slug}`} wide>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
