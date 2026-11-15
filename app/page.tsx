import PageClient from "@/components/PageClient";
import { getStories } from "@/lib/storyStore";

export default async function Page() {
  return <PageClient stories={await getStories()} />;
}
