import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const COLLECTIONS = [
  { slug: "winter-26", name: "Winter '26", desc: "Cozy oversized cuts", grad: "linear-gradient(160deg,#B1EDE8,#F7AF9D)" },
  { slug: "spirit-realm", name: "Spirit Realm", desc: "Limited 200 pieces", grad: "linear-gradient(160deg,#FF6978,#FFD6BA)" },
  { slug: "neon-tokyo", name: "Neon Tokyo", desc: "Streetwear capsule", grad: "linear-gradient(160deg,#2D3142,#FF6978)" },
  { slug: "onsen", name: "Onsen", desc: "Loungewear essentials", grad: "linear-gradient(160deg,#C8E7E2,#B1EDE8)" },
];

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
