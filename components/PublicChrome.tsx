"use client";

import { usePathname } from "next/navigation";
import GlobalNav from "@/components/GlobalNav";
import FloatingCTA from "@/components/FloatingCTA";

/** Site nav and floating CTA, hidden on the admin pages. */
export default function PublicChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <GlobalNav />
      <FloatingCTA />
    </>
  );
}
