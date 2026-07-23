import { PageShell } from "@/components/PageShell";

export default function TermsPage() {
  return (
    <PageShell title="Terms of Service" subtitle="Plain-language ground rules.">
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 font-display text-lg text-foreground">Orders</h2>
          <p>All orders subject to stock and address verification.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg text-foreground">Returns</h2>
          <p>30-day window, unworn, tags attached. Return shipping is on the customer.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg text-foreground">Intellectual property</h2>
          <p>All artwork © Oishi Merch or its collaborators. Do not reproduce without permission.</p>
        </section>
      </div>
    </PageShell>
  );
}
