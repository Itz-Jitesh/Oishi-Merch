"use client";

import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Field({ label, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <Input {...rest} />
    </label>
  );
}

export default function CheckoutPage() {
  return (
    <PageShell title="Checkout" subtitle="Almost there — finalize shipping & payment." wide>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl">Contact</h2>
            <Field label="Email" placeholder="you@example.com" type="email" />
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl">Shipping address</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" placeholder="Ada Lovelace" />
              <Field label="Phone" placeholder="+1 555 555 5555" />
              <div className="md:col-span-2">
                <Field label="Street" placeholder="123 Sakura Ave" />
              </div>
              <Field label="City" placeholder="Kyoto" />
              <Field label="Postal code" placeholder="600-0000" />
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-xl">Payment</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Card number" placeholder="4242 4242 4242 4242" />
              </div>
              <Field label="Expiry" placeholder="MM/YY" />
              <Field label="CVC" placeholder="123" />
            </div>
          </section>
          <Button type="submit" className="w-full rounded-full py-6 text-base">
            Place order
          </Button>
        </form>

        <aside>
          <div className="sticky top-28 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>$184.00</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>Free</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>$14.72</dd></div>
              <div className="my-3 border-t border-border" />
              <div className="flex justify-between text-base"><dt className="font-medium">Total</dt><dd className="font-display text-xl text-primary">$198.72</dd></div>
            </dl>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
