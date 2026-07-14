import { notFound } from "next/navigation";
import { FEATURED_DESTINATIONS } from "@/lib/siteData";
import DestinationDetailPageClient from "@/components/DestinationDetailPageClient";
import { Metadata } from "next";

export function generateStaticParams() {
  return FEATURED_DESTINATIONS.filter((dest) => !dest.href).map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dest = FEATURED_DESTINATIONS.find((d) => d.slug === params.slug && !d.href);
  if (!dest) return {};
  return {
    title: `${dest.name} | Ihan Tours and Travels`,
    description: dest.description,
  };
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const dest = FEATURED_DESTINATIONS.find((d) => d.slug === params.slug && !d.href);

  if (!dest) {
    notFound();
  }

  return <DestinationDetailPageClient dest={dest} />;
}
