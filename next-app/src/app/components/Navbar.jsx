"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { localizePath, stripLocalePrefix, useLocale } from "../lib/locale";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // close mobile menu when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const switchLang = (lang) => {
    const currentPath = stripLocalePrefix(pathname || "/");
    router.push(localizePath(currentPath, lang));
  };

  return (
    <nav className="bg-white text-black shadow right-0 z-50 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-16 lg:h-18">
          {/* Left side: Firm name */}
          <div className="flex items-center">
            <Link
              href={localizePath("/", locale)}
              className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--brand-accent)] transition"
            >
              {locale === "en" ? "AGPA Law Office" : "AGPA Law Office"}
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex sm:space-x-4 lg:space-x-5 items-center font-semibold text-xs lg:text-sm">
            <NavItem href="/" locale={locale} label={locale === "en" ? "Home" : "Αρχική"} />
            <NavItem href="/about" locale={locale} label={locale === "en" ? "Lawyer" : "Δικηγόρος"} />
            <NavItem href="/services" locale={locale} label={locale === "en" ? "Services" : "Υπηρεσίες"} />
            <NavItem href="/office" locale={locale} label={locale === "en" ? "Office" : "Γραφείο"} />
            <NavItem href="/blog" locale={locale} label="Blog" />
            <NavItem href="/contact" locale={locale} label={locale === "en" ? "Contact" : "Επικοινωνία"} />
          </div>

          {/* Language toggle (desktop) */}
          <div className="hidden sm:flex items-center gap-1 ml-2 text-xs">
            <span
              onClick={() => switchLang("el")}
              className={`cursor-pointer font-medium ${
                locale === "el" ? "text-black" : "text-gray-400"
              }`}
            >
              EL
            </span>
            <span className="text-gray-400">|</span>
            <span
              onClick={() => switchLang("en")}
              className={`cursor-pointer font-medium ${
                locale === "en" ? "text-black" : "text-gray-400"
              }`}
            >
              EN
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A4D8F]"
              aria-label={locale === "en" ? "Open menu" : "Άνοιγμα μενού"}
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
            <NavItem href="/" locale={locale} label={locale === "en" ? "Home" : "Αρχική"} />
            <NavItem href="/about" locale={locale} label={locale === "en" ? "Lawyer" : "Δικηγόρος"} />
            <NavItem href="/services" locale={locale} label={locale === "en" ? "Services" : "Υπηρεσίες"} />
            <NavItem href="/office" locale={locale} label={locale === "en" ? "Office" : "Γραφείο"} />
            <NavItem href="/blog" locale={locale} label="Blog" />
            <NavItem href="/contact" locale={locale} label={locale === "en" ? "Contact" : "Επικοινωνία"} />
          </div>

          {/* Mobile language toggle */}
          <div className="flex justify-end gap-1 px-4 py-2 text-xs">
            <span
              onClick={() => switchLang("el")}
              className={`cursor-pointer font-medium ${
                locale === "el" ? "text-black" : "text-gray-400"
              }`}
            >
              EL
            </span>
            <span className="text-gray-400">|</span>
            <span
              onClick={() => switchLang("en")}
              className={`cursor-pointer font-medium ${
                locale === "en" ? "text-black" : "text-gray-400"
              }`}
            >
              EN
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ href, locale, label }) {
  const pathname = usePathname();
  const currentPath = stripLocalePrefix(pathname || "/");
  const isHome = href === "/";
  const isActive = isHome
    ? currentPath === "/"
    : currentPath === href || currentPath.startsWith(href + "/");

  return (
    <Link
      href={localizePath(href, locale)}
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
