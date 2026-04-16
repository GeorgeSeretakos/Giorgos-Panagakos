"use client";

import Link from "next/link";
import { localizePath, useLocale } from "../lib/locale";

export default function ThankYouPage() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {isEn
          ? "Thank you for reaching out!"
          : "Ευχαριστούμε για την επικοινωνία σας!"}
      </h1>
      <Link
        href={localizePath("/", locale)}
        className="text-sky-400 underline hover:text-sky-300 transition"
      >
        {isEn ? "Return to homepage" : "Επιστροφή στην αρχική σελίδα"}
      </Link>
    </main>
  );
}
