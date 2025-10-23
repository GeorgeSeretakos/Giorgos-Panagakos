// app/book/studio/[slug]/page.jsx
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@lib/prisma";
import ClientStudioPage from "./ClientStudioPage";

export const revalidate = 0; // ensure per-request render so cookies() is honored

export default async function StudioSlugPage({ params }) {
  const studio = await prisma.studio.findUnique({
    where: { slug: params.slug },
  });
  if (!studio) return notFound();

  // Read locale cookie on the server; default to Greek ("el")
  const cookieLocale = cookies().get("locale")?.value;
  const initialLocale = cookieLocale === "en" ? "en" : "el";

  return <ClientStudioPage studio={studio} initialLocale={initialLocale} />;
}
