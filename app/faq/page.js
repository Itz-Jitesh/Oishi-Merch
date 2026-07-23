"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const FAQS = [
  { q: "How long does shipping take?", a: "Standard 3–5 business days in-country, 7–14 international." },
  { q: "Do you accept returns?", a: "Yes — 30 days from delivery, unworn with tags." },
  { q: "Are drops restocked?", a: "Rarely. Limited capsules stay limited." },
  { q: "What sizes do you carry?", a: "XS through XXL on most apparel. Size guide on each product page." },
  { q: "Where do you ship from?", a: "Kyoto, Japan. All parcels tracked." },
];

export default function FaqPage() {
  const [open, setOpen] = useState(0);
  return (
    <PageShell title="Frequently asked" subtitle="Can't find the answer? Ping us on the contact page.">
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <button
            key={f.q}
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full rounded-2xl border border-border bg-card p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{f.q}</p>
              <ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
            </div>
            {open === i && <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>}
          </button>
        ))}
      </div>
    </PageShell>
  );
}
