import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function PageShell({ title, subtitle, children, wide = false }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className={`mx-auto px-4 py-10 ${wide ? "max-w-7xl" : "max-w-5xl"}`}>
        {title ? (
          <header className="mb-8">
            <h1 className="font-display text-3xl text-foreground md:text-4xl">{title}</h1>
            {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
          </header>
        ) : null}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
