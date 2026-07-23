import { User, MapPin, Shield, Package, Bell, LayoutGrid } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NavLink } from "@/components/NavLink";

const NAV = [
  { href: "/account", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/security", label: "Security", icon: Shield },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
];

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-6 font-display text-3xl md:text-4xl">Account</h1>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-1">
            {NAV.map((n) => (
              <NavLink
                key={n.href}
                href={n.href}
                exact={n.exact}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </NavLink>
            ))}
          </aside>
          <section>{children}</section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
