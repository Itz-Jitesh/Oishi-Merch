import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Boxes, BarChart3, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { getCurrentUser } from "@/lib/jwt/getCurrentUser";
import { notFound } from "next/navigation";

const user = await getCurrentUser();


const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export const metadata = {
  title: "Admin — Oishi Merch",
  description: "Oishi Merch admin console.",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    console.log("User is not an admin or not logged in:", user);
    notFound();
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-card p-4 md:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">お</span>
          <span className="font-display text-lg">Admin</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => (
            <NavLink
              key={n.href}
              href={n.href}
              exact={n.exact}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary"
              activeClassName="bg-primary text-primary-foreground"
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <Link href="/" className="rounded-xl px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
          ← Back to store
        </Link>
      </aside>
      <main className="min-h-screen p-6 md:pl-[16.5rem]">
        {children}
      </main>
    </div>
  );
}
