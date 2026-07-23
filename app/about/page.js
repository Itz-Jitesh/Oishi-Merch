import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell title="About Oishi Merch" subtitle="A small studio making things fans actually want to wear.">
      <div className="prose prose-neutral max-w-none text-foreground">
        <p className="text-base leading-relaxed text-muted-foreground">
          Oishi Merch started in a tiny Kyoto walk-up in 2022 with two friends, a screen-printer,
          and stacks of favorite manga. Today we're a team of ten shipping weekly drops to
          collectors in over forty countries.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "40+", l: "Countries shipped" },
            { n: "12k", l: "Pieces sold" },
            { n: "98%", l: "Happy collectors" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center">
              <p className="font-display text-3xl text-primary">{s.n}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
