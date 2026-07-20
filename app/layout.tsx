import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lorcatecture.com"),
  title: {
    default: "Lorcatecture Group | Architecture · Design · Legacy",
    template: "%s | Lorcatecture Group",
  },
  description:
    "A multidisciplinary architecture and design practice creating environments of enduring significance across Southeast Asia and the Middle East.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lorcatecture Group",
    description: "Architecture that endures generations.",
    url: "https://www.lorcatecture.com",
    siteName: "Lorcatecture Group",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
