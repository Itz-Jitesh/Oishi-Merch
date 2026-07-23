"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADDRESSES = [
  { label: "Home", line: "3-14 Sakuragawa, Kyoto 600-0000", default: true },
  { label: "Studio", line: "Building 7 Floor 2, Osaka 530-0001", default: false },
];

export default function AddressesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Addresses</h2>
        <Button className="rounded-full"><Plus className="h-4 w-4 mr-1" /> Add address</Button>
      </div>
      {ADDRESSES.map((a) => (
        <div key={a.label} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{a.label} {a.default && <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Default</span>}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a.line}</p>
            </div>
            <button className="text-sm text-primary hover:underline">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}
