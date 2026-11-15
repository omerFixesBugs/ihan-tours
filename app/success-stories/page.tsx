import SuccessStoriesPageClient from "@/components/SuccessStoriesPageClient";
import { getStories } from "@/lib/storyStore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success Stories | Ihan Tours and Travels",
  description: "Clients we have successfully sent to Europe on work visas, now working abroad.",
};

export default async function SuccessStoriesPage() {
  return <SuccessStoriesPageClient stories={await getStories()} />;
}
