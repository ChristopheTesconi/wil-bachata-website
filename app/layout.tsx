import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./globals.css";

import NavBar from "@/components/layout/NavBar/NavBar";
import Footer from "@/components/layout/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Wil Bachata - Professional Bachata Dance Classes in St. Gallen",
    template: "%s | Wil Bachata",
  },
  description:
    "Learn Bachata with Wilfried in St. Gallen, Switzerland. Bachata Fusion classes for all levels - beginners to advanced. Join our passionate dance community.",
  keywords: [
    "Bachata St. Gallen",
    "Bachata classes Switzerland",
    "Dance classes St. Gallen",
    "Wilfried Bachata Fusion",
    "Bachata lessons",
    "Latin dance St. Gallen",
    "Bachata sensual",
    "partner dance classes",
  ],
  authors: [{ name: "Wil Bachata" }],
  creator: "Wil Bachata",
  publisher: "Wil Bachata",
  metadataBase: new URL("https://wilbachata.com"),
  openGraph: {
    title: "Wil Bachata - Bachata Fusion in St. Gallen",
    description:
      "Join Wilfried's Bachata Fusion dance classes in St. Gallen, Switzerland. Suitable for all levels.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Wil Bachata",
    images: [
      {
        url: "/rdf_logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Wil Bachata - Dance Classes in St. Gallen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wil Bachata - Bachata Fusion in St. Gallen",
    description:
      "Join Wilfried's Bachata Fusion dance classes in St. Gallen, Switzerland.",
    images: ["/rdf_logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      de: "/de",
      fr: "/fr",
    },
  },
  verification: {
    // Ajoute ces codes quand tu les obtiens
    google: "ton-code-google-search-console",
    // yandex: "ton-code-yandex",
    // bing: "ton-code-bing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/rdf_fav.png" sizes="any" />
        <link rel="apple-touch-icon" href="/rdf_fav.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E91E63" />
      </head>
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