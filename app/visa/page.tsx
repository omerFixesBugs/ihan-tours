import VisaPageClient from "@/components/VisaPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa & Ticketing | Ihan Tours and Travels",
  description: "Hassle-free visa processing and air ticketing services.",
};

export default function VisaPage() {
  return <VisaPageClient />;
}

