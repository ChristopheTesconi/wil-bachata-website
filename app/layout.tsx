import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wil Bachata - Professional Bachata Dance Classes in St. Gallen",
  description:
    "Learn Bachata with Wilfried in St. Gallen, Switzerland. Bachata Fusion classes for all levels.",
  keywords: [
    "Bachata St. Gallen",
    "Bachata classes Switzerland",
    "Dance classes St. Gallen",
    "Wilfried Bachata Fusion",
  ],
  authors: [{ name: "Wil Bachata" }],
  openGraph: {
    title: "Wil Bachata - Bachata Fusion in St. Gallen",
    description:
      "Join Wilfried’s Bachata Fusion dance classes in St. Gallen, Switzerland. Suitable for all levels.",
    type: "website",
    locale: "en_US",
    url: "https://wilbachata.com", // adapte quand tu as ton domaine
    siteName: "Wil Bachata",
  },
  alternates: {
    canonical: "https://wilbachata.com",
    languages: {
      en: "https://wilbachata.com/en",
      de: "https://wilbachata.com/de",
      fr: "https://wilbachata.com/fr",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
