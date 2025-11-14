"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const metadata = { robots: { index: false, follow: false } };

export default function ThankYou() {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  const isEn = locale === "en";

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {isEn
          ? "Thank you for reaching out!"
          : "Ευχαριστούμε για την επικοινωνία σας!"}
      </h1>

      <Link
        href="/"
        className="text-sky-400 underline hover:text-sky-300 transition"
      >
        {isEn ? "Return to homepage" : "Επιστροφή στην αρχική σελίδα"}
      </Link>
    </main>
  );
}
