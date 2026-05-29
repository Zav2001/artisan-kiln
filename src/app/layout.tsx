import type { Metadata } from "next";
import { Barlow_Condensed, DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import StoreProvider from "@/components/providers/StoreProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The Artisan Kiln — Ceramic Tile Order Form",
  description:
    "Interactive ceramic tile order form with shopping cart, design visualizer, and checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${barlowCondensed.variable} ${dmSans.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
