import { prisma } from "@lib/prisma";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ClientAvailabilityPage from "./ClientAvailabilityPage";

export const revalidate = 0; // render per request so cookies() is honored

export default async function AvailabilityPage({ params }) {
  const studio = await prisma.studio.findUnique({
    where: { slug: params.slug },
  });
  if (!studio) return notFound();

  // Match StudioSlugPage logic: cookie → default "el"
  const cookieLocale = cookies().get("locale")?.value;
  const initialLocale = cookieLocale === "en" ? "en" : "el";

  return <ClientAvailabilityPage studio={studio} initialLocale={initialLocale} />;
}
