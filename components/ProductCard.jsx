import Link from "next/link";

export function ProductCard({ product }) {

  return (
    <article className="group cursor-pointer">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className="aspect-square w-full overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-transform group-hover:-translate-y-1"
          style={{ background: `linear-gradient(135deg, ${product.color}, var(--background))` }}
        >
          <div className="flex h-full w-full items-end justify-start p-4">
            <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {product.category}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
          <span className="text-sm font-semibold text-primary">₹{product.price}</span>
        </div>
      </Link>
    </article>
  );
}
