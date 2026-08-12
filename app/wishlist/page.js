import Link from "next/link";
import { Heart } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/product";

export default function WishlistPage() {
  const items = PRODUCTS.slice(2, 8);
  return (
    <PageShell
      title={<span className="inline-flex items-center gap-3"><Heart className="h-7 w-7 text-primary" /> Wishlist</span>}
      subtitle="Pieces you'll be pulling out of the wardrobe again."
      wide
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (

          <ProductCard key={p.id} product={p} />

        ))}
      </div>
    </PageShell>
  );
}
