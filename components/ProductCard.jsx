"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export function ProductCard({ product }) {
  const image = product.images && product.images.length > 0 ? product.images[0] : null;
  const [inWishlist, setInWishlist] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let active = true;

    const loadWishlistState = async () => {
      try {
        const response = await fetch("/api/wishlist");
        if (!response.ok) return;
        const data = await response.json();
        if (active) setInWishlist((data.wishlist || []).includes(product.slug));
      } catch (error) {
        // Initial state is best-effort; heart simply defaults to outline.
      }
    };

    loadWishlistState();

    return () => {
      active = false;
    };
  }, [product.slug]);

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (toggling) return;

    setToggling(true);

    try {
      const response = await fetch("/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: product.slug }),
      });

      if (response.status === 401) {
        window.location.href = "/auth/login";
        return;
      }

      if (!response.ok) return;

      const data = await response.json();
      setInWishlist((data.wishlist || []).includes(product.slug));
    } catch (error) {
      // Ignore; the heart keeps its current state.
    } finally {
      setToggling(false);
    }
  };

  return (
    <article className="group cursor-pointer">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-card)] transition-transform group-hover:-translate-y-1">
            {image ? (
              <img
                src={image}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : null}
            <div className="absolute inset-x-0 bottom-0 flex justify-start p-4">
              <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                {product.category}
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-start justify-between gap-2">
            <h3 className="min-w-0 text-sm font-medium text-foreground">{product.name}</h3>
            <span className="shrink-0 text-sm font-semibold text-primary">₹{product.price}</span>
          </div>
        </Link>

        <button
          type="button"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleToggleWishlist}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition hover:border-primary"
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-primary text-primary" : ""}`} />
        </button>
      </div>
    </article>
  );
}
