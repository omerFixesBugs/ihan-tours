import AboutPageClient from "@/components/AboutPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Ihan Tours and Travels",
  description: "Learn more about our mission, vision, and dedication to curated travel experiences.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

