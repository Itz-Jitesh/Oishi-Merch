import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { CATEGORIES, PRODUCTS } from "@/data/product";

export default function CategoriesPage() {
  return (
    <PageShell title="Categories" subtitle="Pick a lane. All drops sorted by silhouette." wide>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {CATEGORIES.map((c) => {
          const sample = PRODUCTS.find((p) => p.category === c);
          return (
            <Link
              key={c}
              href={`/categories/${c}`}
              className="group overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]"
            >
              <div
                className="aspect-[4/3] w-full transition-transform group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${sample?.color ?? "var(--secondary)"}, var(--background))`,
                }}
              />
              <div className="flex items-center justify-between p-4">
                <h3 className="font-display text-lg capitalize">{c}</h3>
                <span className="text-xs text-muted-foreground">
                  {PRODUCTS.filter((p) => p.category === c).length} items
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
