import type { Metadata } from "next";
import { Inter, Unbounded, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalNav from "@/components/GlobalNav";
import FloatingCTA from "@/components/FloatingCTA";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-inter",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-unbounded",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "Ihan Tours and Travels | Celebrate the Journey",
  description:
    "Celebrate the Journey with Ihan Tours and Travels. We offer expertly curated packages for Umrah, global tours, inbound travel, and visa assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${unbounded.variable} ${hindSiliguri.variable} scroll-smooth bg-background text-foreground`}
    >
      <body className="font-sans antialiased selection:bg-gold-500 selection:text-black">
        <LanguageProvider>
          <GlobalNav />
          <FloatingCTA />
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}

