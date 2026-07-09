import UmrahPageClient from "@/components/UmrahPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Umrah Packages | Ihan Tours and Travels",
  description: "Embark on a deeply spiritual Umrah journey with Ihan Tours.",
};

export default function UmrahPage() {
  return <UmrahPageClient />;
}

