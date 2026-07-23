import { PageShell } from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy Policy" subtitle="Last updated July 2026.">
      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 font-display text-lg text-foreground">Data we collect</h2>
          <p>We collect account info, order history, and shipping details you provide at checkout.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg text-foreground">How we use it</h2>
          <p>Only to fulfill orders, provide support, and send drop notifications you opt into.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-lg text-foreground">Your rights</h2>
          <p>You can request deletion or export any time at hello@oishimerch.co.</p>
        </section>
      </div>
    </PageShell>
  );
}
