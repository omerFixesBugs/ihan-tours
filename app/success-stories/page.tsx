import SuccessStoriesPageClient from "@/components/SuccessStoriesPageClient";
import { getPassportImages } from "@/lib/passports";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Ihan Tours and Travels",
  description: "Clients we have successfully sent to Europe on work visas, now working abroad.",
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesPageClient passports={getPassportImages()} />;
}
