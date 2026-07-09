import PackagesPageClient from "@/components/PackagesPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Packages | Ihan Tours and Travels",
  description: "Explore the world with our premium international holiday packages.",
};

export default function PackagesPage() {
  return <PackagesPageClient />;
}

