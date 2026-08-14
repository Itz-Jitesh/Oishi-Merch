import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { CATEGORIES, PRODUCTS } from "@/data/product";

export default function CategoriesPage() {
  return (
    <PageShell title="Categories" subtitle="Pick a lane. All drops sorted by silhouette." wide>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.name}`}
            className="group overflow-hidden rounded-3xl border border-border bg-secondary shadow-[var(--shadow-card)]"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <h3 className="font-display text-lg capitalize">{c.name}</h3>
              <span className="text-xs text-muted-foreground">
                {PRODUCTS.filter((p) => p.category === c.name).length} items
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
