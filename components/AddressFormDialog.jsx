"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EMPTY_ADDRESS } from "@/lib/addresses";

function Field({ label, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Input {...rest} />
    </label>
  );
}

export function AddressFormDialog({ open, onOpenChange, initial, onSave, title = "Add address" }) {
  const [form, setForm] = useState(initial || EMPTY_ADDRESS);

  useEffect(() => {
    if (open) setForm(initial || EMPTY_ADDRESS);
  }, [open, initial]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
          <DialogDescription>
            Fill in the shipping details for this address.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={form.name || ""} onChange={set("name")} placeholder="Ada Lovelace" autoComplete="name" required />
          <Field label="Phone" value={form.phone || ""} onChange={set("phone")} placeholder="+91 98765 43210" autoComplete="tel" required />
          <div className="sm:col-span-2">
            <Field label="Address line 1" value={form.addressLine1 || ""} onChange={set("addressLine1")} placeholder="3-14 Sakuragawa" autoComplete="address-line1" required />
          </div>
          <div className="sm:col-span-2">
            <Field label="Address line 2" value={form.addressLine2 || ""} onChange={set("addressLine2")} placeholder="Apt 4B (optional)" autoComplete="address-line2" />
          </div>
          <Field label="City" value={form.city || ""} onChange={set("city")} placeholder="Kyoto" autoComplete="address-level2" required />
          <Field label="State" value={form.state || ""} onChange={set("state")} placeholder="Kyoto" autoComplete="address-level1" required />
          <Field label="Postal code" value={form.postalCode || ""} onChange={set("postalCode")} placeholder="600-0000" autoComplete="postal-code" required />

          <label className="flex items-center gap-2 self-end text-sm text-foreground">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--primary)]"
              checked={!!form.isDefault}
              onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
            />
            Set as default address
          </label>

          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" className="rounded-full" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-full">Save address</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddressFormDialog;
