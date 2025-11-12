// app/layout.jsx (or layout.tsx)
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import Footer from "@components/Footer";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
    subsets: ["latin", "greek"],
    variable: "--font-roboto-condensed",
    weight: ["300", "400", "700"],
});

export const metadata = {
    title: "AGPA LAW OFFICE",
    description: "Δικηγορικό Γραφείο Αγγελόπουλος - Παναγάκος",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="el" className={robotoCondensed.variable}>
        <body className="antialiased min-h-screen flex flex-col bg-[#0B0B0C] text-white">
        {/* Hidden build-time form for Netlify detection */}
        <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            hidden
        >
            <input type="hidden" name="form-name" value="contact" />
            <input type="text" name="firstName" />   {/* ✅ aligned */}
            <input type="text" name="lastName" />    {/* ✅ aligned */}
            <input type="email" name="email" />      {/* ✅ aligned */}
            <input type="tel" name="phone" />        {/* ✅ aligned */}
            <textarea name="message" />              {/* ✅ aligned */}
            <input type="text" name="bot-field" />   {/* ✅ honeypot */}
        </form>

        <Navbar />
        <main className="flex-1 mt-16 text-justify">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
