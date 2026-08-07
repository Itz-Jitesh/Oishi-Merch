import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

const COLS = [
  {
    title: "Shop",
    links: ["New In", "T-Shirt", "Hoodies", "Posters", "Accessories"],
  },
  {
    title: "Help",
    links: ["Shipping", "Returns", "Size Guide", "Track Order", "Contact"],
  },
  {
    title: "Company",
    links: ["About", "Artists", "Sustainability", "Wholesale", "Press"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
              お
            </span>
            <span className="font-display text-lg font-bold">Oishi Merch</span>
          </div>
          <p className="max-w-xs text-sm text-background/70">
            Anime-inspired apparel and collectibles, designed with the artists who make the worlds we love.
          </p>
          <div className="flex gap-2">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-xl bg-background/10 transition hover:bg-primary"
                aria-label="social"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-background/90">
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-5 text-xs text-background/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Oishi Merch. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/terms" className="hover:text-primary">Terms</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/faq" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
