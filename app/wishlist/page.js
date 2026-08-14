"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist");

        if (response.status === 401) {
          window.location.href = "/auth/login";
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }

        const data = await response.json();
        setItems(data.items || []);
      } catch (error) {
        // console.error("FAILED TO FETCH WISHLIST:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  return (
    <PageShell
      title={<span className="inline-flex items-center gap-3"><Heart className="h-7 w-7 text-primary" /> Wishlist</span>}
      subtitle="Pieces you'll be pulling out of the wardrobe again."
      wide
    >
      {loading ? null : items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">Your wishlist is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
          >
            Shop products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
