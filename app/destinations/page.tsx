import DestinationsPageClient from "@/components/DestinationsPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations | Ihan Tours and Travels",
  description: "Choose your destination and explore curated holiday and spiritual travel spots across the globe.",
};

export default function DestinationsPage() {
  return <DestinationsPageClient />;
}
