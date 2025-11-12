"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // close mobile menu when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white text-black shadow right-0 z-50 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-16 lg:h-18">
          {/* Left side: Firm name */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--brand-accent)] transition"
            >
              AGPA Law Office
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex sm:space-x-4 lg:space-x-5 items-center font-semibold text-xs lg:text-sm">
            <NavItem href="/" label="Αρχική" />
            <NavItem href="/about" label="Δικηγόρος" />
            <NavItem href="/services" label="Υπηρεσίες" />
            <NavItem href="/office" label="Γραφείο" />
            <NavItem href="/blog" label="Blog" />
            <NavItem href="/contact" label="Επικοινωνία" />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A4D8F]"
              aria-label="Άνοιγμα μενού"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {mobileOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">
          <div className="flex flex-col space-y-2 px-4 py-4 font-medium">
            <NavItem href="/" label="Αρχική" />
            <NavItem href="/about" label="Δικηγόρος" />
            <NavItem href="/services" label="Υπηρεσίες" />
            <NavItem href="/office" label="Γραφείο" />
            <NavItem href="/blog" label="Blog" />
            <NavItem href="/contact" label="Επικοινωνία" />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ href, label }) {
  const pathname = usePathname();
  const isHome = href === "/";
  const isActive = isHome
    ? pathname === "/"
    : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex items-center px-2 py-1 rounded-sm transition whitespace-nowrap ${
        isActive
          ? "text-[#1A4D8F] font-semibold"
          : "text-[var(--foreground)] hover:text-[#1A4D8F]"
      }`}
    >
      {label}
    </Link>
  );
}
