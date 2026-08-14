"use client";

import Link from "next/link";
import { useState,useEffect} from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";

const NAV = [
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/collections", label: "Collections" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const handleSearchSubmit = (e) => {
    if (e.key === "Escape") {
      setSuggestionsOpen(false);
      return;
    }
    if (e.key === "Enter" && searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    const value = searchQuery.trim();

    if (value.length < 2) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search/autocomplete?q=${encodeURIComponent(value)}`
        );
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setSuggestions((data.results || []).slice(0, 8));
        setSuggestionsOpen(true);
      } catch {
        if (!cancelled) {
          setSuggestions([]);
          setSuggestionsOpen(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="bg-foreground py-2 text-center text-xs font-medium text-background">
        Free shipping over ₹60 · New Winter '26 drop is live
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 md:gap-4 md:px-5">
        {/* Mobile menu */}
        <button
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-xl text-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-base font-bold text-primary-foreground md:h-9 md:w-9">
            お
          </span>
          <span className="font-display text-base font-bold tracking-tight text-foreground md:text-lg">
            Oishi Merch
          </span>
        </Link>

        {/* Nav links — centered */}
        <nav className="ml-6 hidden flex-1 items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Search bar */}
        <div className="ml-auto hidden flex-1 max-w-sm md:block">
          <div
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setSuggestionsOpen(false);
              }
            }}
          >
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="Search anime, series, characters…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {suggestionsOpen && suggestions.length > 0 ? (
              <div
                aria-label="Search suggestions"
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                {suggestions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/products/${s.slug}`}
                    onClick={() => setSuggestionsOpen(false)}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition hover:bg-secondary"
                  >
                    <span className="truncate text-foreground">{s.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {s.category}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Mobile search trigger */}
        <button
          onClick={() => setSearchOpen((v) => !v)}
          className="ml-auto grid h-11 w-11 place-items-center rounded-xl text-foreground hover:bg-secondary md:hidden"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        {/* Icon actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/wishlist"
            className="relative hidden h-10 w-10 place-items-center rounded-xl text-foreground hover:bg-secondary md:grid"
            aria-label="Wishlist"
          >
            <Heart size={18} />
          </Link>
          <Link
            href="/account"
            className="hidden h-10 w-10 place-items-center rounded-xl text-foreground hover:bg-secondary md:grid"
            aria-label="Account"
          >
            <User size={18} />
          </Link>
          <Link
            href="/cart"
            className="relative grid h-11 w-11 place-items-center rounded-xl text-foreground hover:bg-secondary md:h-10 md:w-10"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />

          </Link>
        </div>
      </div>

      {/* Mobile search panel */}
      {searchOpen ? (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden md:px-5">
          <div
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setSuggestionsOpen(false);
              }
            }}
          >
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              autoFocus
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="h-11 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
            />
            {suggestionsOpen && suggestions.length > 0 ? (
              <div
                aria-label="Search suggestions"
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
              >
                {suggestions.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/products/${s.slug}`}
                    onClick={() => setSuggestionsOpen(false)}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition hover:bg-secondary"
                  >
                    <span className="truncate text-foreground">{s.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {s.category}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        inert={!open}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <aside
          role="dialog"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col border-r border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-lg font-bold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-xl hover:bg-secondary"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-lg font-semibold text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <div className="my-3 h-px bg-border" />
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-base text-foreground hover:bg-secondary"
            >
              <Heart size={18} /> Wishlist
            </Link>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-base text-foreground hover:bg-secondary"
            >
              <User size={18} /> Account
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
