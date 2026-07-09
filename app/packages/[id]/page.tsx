import { notFound } from "next/navigation";
import { POPULAR_PACKAGES } from "@/lib/packages";
import PackageDetailPageClient from "@/components/PackageDetailPageClient";
import { Metadata } from "next";

export function generateStaticParams() {
  return POPULAR_PACKAGES.map((pkg) => ({
    id: pkg.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const pkg = POPULAR_PACKAGES.find((p) => p.id === params.id);
  if (!pkg) return {};
  return {
    title: `${pkg.title} | Ihan Tours and Travels`,
    description: pkg.description,
  };
}

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const pkg = POPULAR_PACKAGES.find((p) => p.id === params.id);
  
  if (!pkg) {
    notFound();
  }

  return <PackageDetailPageClient pkg={pkg} />;
}
