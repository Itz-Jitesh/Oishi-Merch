import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { COLLECTIONS } from "@/data/product";

export default function CollectionsPage() {
  return (
    <PageShell title="Collections" subtitle="Themed capsules refreshed each season." wide>
      <div className="grid gap-5 md:grid-cols-2">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]"
          >
            <div
              className="aspect-[16/10] transition-transform group-hover:scale-105"
              style={{ background: c.grad }}
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/60 to-transparent p-6 text-background">
              <h3 className="font-display text-2xl">{c.name}</h3>
              <p className="text-sm opacity-90">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
