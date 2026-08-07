"use client";

import Link from "next/link";
import { useState } from "react";
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

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="bg-foreground py-2 text-center text-xs font-medium text-background">
        Free shipping over $60 · New Winter '26 drop is live
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5">
        {/* Mobile menu */}
        <button
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-xl text-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
            お
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
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
          <div className="relative">
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
          </div>
        </div>

        {/* Mobile search trigger */}
        <button
          onClick={() => setSearchOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-xl text-foreground hover:bg-secondary md:hidden"
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
            className="relative grid h-10 w-10 place-items-center rounded-xl text-foreground hover:bg-secondary"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile search panel */}
      {searchOpen ? (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          <div className="relative">
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
              className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      ) : null}

      {/* Mobile menu drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 bg-background p-6 md:hidden">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-lg font-bold">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
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
        </div>
      ) : null}
    </header>
  );
}
