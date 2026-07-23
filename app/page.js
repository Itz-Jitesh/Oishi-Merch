"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";

const HERO_SLIDES = [
  {
    title: "Winter '26 drop",
    sub: "Cozy oversized tees inspired by your favorite slice-of-life arcs.",
    cta: "Shop the drop",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Studio-signed posters",
    sub: "Limited edition prints, numbered and shipped in protective tubes.",
    cta: "Browse posters",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Collector pins are back",
    sub: "Hard enamel, glow variants, mystery packs — all restocked.",
    cta: "Shop pins",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=2000&q=80",
  },
];

const CATEGORIES = [
  {
    name: "Apparel",
    count: "120+ pieces",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Posters & Prints",
    count: "80+ designs",
    image: "https://images.unsplash.com/photo-1561728590-029b6d29a7f7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Collectibles",
    count: "60+ items",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80",
  },
];

const PRODUCTS = [
  { name: "Ramen Cat Tee", price: "$32", tag: "Bestseller", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80" },
  { name: "Sakura Hoodie", price: "$68", tag: "New", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80" },
  { name: "Mecha Poster Set", price: "$24", tag: null, image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&w=700&q=80" },
  { name: "Onigiri Sticker Pack", price: "$8", tag: "Restock", image: "https://images.unsplash.com/photo-1604066867775-43f48e3957d8?auto=format&fit=crop&w=700&q=80" },
  { name: "Studio Tote", price: "$28", tag: null, image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80" },
  { name: "Glow Enamel Pin", price: "$12", tag: "Limited", image: "https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=700&q=80" },
];

const REVIEWS = [
  { name: "Mika R.", body: "The tee feels premium and the print didn't crack after a dozen washes. Obsessed.", rating: 5 },
  { name: "Devon L.", body: "Poster arrived flawless in a sturdy tube. The colors are way richer than the photos.", rating: 5 },
  { name: "Aisha K.", body: "Shipping was fast and the packaging itself is a keepsake. Will reorder.", rating: 5 },
];

const OCCASIONS = [
  { name: "Comicon", image: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?auto=format&fit=crop&w=700&q=80" },
  { name: "Outdoors", image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=700&q=80" },
  { name: "Everyday", image: "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=700&q=80" },
  { name: "Loungewear", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=700&q=80" },
];

function HeroLoop() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mx-auto max-w-7xl px-5 pt-6">
      <div className="relative h-[420px] overflow-hidden rounded-3xl md:h-[560px]">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
          >
            <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-primary-foreground md:p-14">
              <span className="mb-3 inline-block w-fit rounded-full bg-background/20 px-3 py-1 text-xs font-medium backdrop-blur">
                Now live
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                {s.title}
              </h1>
              <p className="mt-3 max-w-lg text-sm text-primary-foreground/85 md:text-base">
                {s.sub}
              </p>
              <div className="mt-6">
                <Button className="rounded-xl bg-background text-foreground hover:bg-background/90">
                  {s.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 right-5 flex gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-background" : "w-3 bg-background/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCarousel() {
  const scroller = useRef(null);

  const scroll = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary">
            This week's picks
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Fan favorites, restocked
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-secondary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PRODUCTS.map((p) => (
          <article
            key={p.name}
            className="group w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl bg-card sm:w-[45%] md:w-[28%] lg:w-[23%]"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="relative aspect-square overflow-hidden bg-secondary/40">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {p.tag ? (
                <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  {p.tag}
                </span>
              ) : null}
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.price}</p>
              </div>
              <button className="rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground">
                Add
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroLoop />

      {/* Tag line band */}
      <section className="mx-auto max-w-7xl px-5 pt-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Shop by category
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
          Pick your poison
        </h2>
      </section>

      {/* Categories */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.name}
            href="/"
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <img
              src={c.image}
              alt={c.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-background">
              <h3 className="font-display text-2xl font-bold">{c.name}</h3>
              <p className="text-sm text-background/80">{c.count}</p>
            </div>
          </Link>
        ))}
      </section>

      <ProductCarousel />

      {/* Video loop */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        <div
          className="relative h-[360px] overflow-hidden rounded-3xl md:h-[480px]"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=2000&q=80"
            alt="Inside the studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-background">
            <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
              ▶
            </span>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Inside the studio
            </h2>
            <p className="mt-2 max-w-md px-6 text-sm text-background/80">
              Watch how each drop comes together — from sketch to stitched.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-5 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Loved by fans
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            What collectors are saying
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl bg-card p-6 text-left"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="mb-3 flex gap-0.5 text-primary">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground">"{r.body}"</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  — {r.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Style it your way
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
            Fits for every occasion
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {OCCASIONS.map((o) => (
            <Link
              key={o.name}
              href="/"
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={o.image}
                alt={o.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/30 transition group-hover:bg-foreground/50" />
              <span className="absolute inset-0 grid place-items-center font-display text-2xl font-bold text-background">
                {o.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Insta banner */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div
          className="overflow-hidden rounded-3xl bg-primary p-10 text-center text-primary-foreground md:p-14"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <Instagram className="mx-auto mb-4" size={36} />
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary-foreground/80">
            #OishiFits
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Upload your fit. Tag us on Insta.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/85">
            Get featured on our feed and unlock 15% off your next drop.
          </p>
          <Button className="mt-6 rounded-xl bg-background text-foreground hover:bg-background/90">
            Tag @oishimerch
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
