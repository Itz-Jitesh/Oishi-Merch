"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <PageShell title="Contact us" subtitle="We reply within 24 hours, weekdays." wide>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "hello@oishimerch.co" },
            { icon: Phone, label: "Phone", value: "+81 (0) 75 555 0110" },
            { icon: MapPin, label: "Studio", value: "3-14 Sakuragawa, Kyoto" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                <p className="font-medium">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <Input placeholder="Your name" />
          <Input type="email" placeholder="Email" />
          <textarea
            rows={5}
            placeholder="Tell us what's up…"
            className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:border-primary"
          />
          <Button className="w-full rounded-full">Send message</Button>
        </form>
      </div>
    </PageShell>
  );
}
