import Link from "next/link";

export function AuthIllustration() {
  return (
    <div className="relative hidden h-full min-h-screen overflow-hidden md:block">
      <img
        src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80"
        alt="Anime style artwork"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full min-h-screen flex-col justify-between p-10 text-primary-foreground">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-background/90 text-lg font-bold text-primary">
            お
          </span>
          <span className="font-display text-xl font-bold tracking-tight">Oishi Merch</span>
        </Link>

        <div className="max-w-md space-y-3">
          <span className="inline-block rounded-full bg-background/20 px-3 py-1 text-xs font-medium backdrop-blur">
            New drop — Winter '26
          </span>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Wear the worlds you love.
          </h2>
          <p className="text-sm text-primary-foreground/85">
            Anime tees, posters, and collectibles handpicked from your favorite series.
          </p>
        </div>
      </div>
    </div>
  );
}
