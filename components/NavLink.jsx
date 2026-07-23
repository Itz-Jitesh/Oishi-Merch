"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, exact, children, className = "", activeClassName = "" }) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href} className={`${className} ${active ? activeClassName : ""}`}>
      {children}
    </Link>
  );
}
