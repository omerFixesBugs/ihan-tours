import InboundPageClient from "@/components/InboundPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbound Tours | Ihan Tours and Travels",
  description: "Discover the hidden gems of Bangladesh with our inbound eco-tours.",
};

export default function InboundPage() {
  return <InboundPageClient />;
}

