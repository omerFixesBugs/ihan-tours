import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Ihan Tours",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-neutral-950 text-white"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
