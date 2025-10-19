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
    default:
      "RDF Bachata Fusion - Professional Bachata Dance Classes in St. Gallen",
    template: "%s | RDF Bachata Fusion",
  },
  description:
    "Learn Bachata Fusion with Coach Wil in St. Gallen, Switzerland. Professional dance classes for all levels - beginners to advanced. Join our passionate dance community at RDF Bachata Fusion.",
  keywords: [
    "Bachata St. Gallen",
    "RDF Bachata Fusion",
    "Coach Wil",
    "Bachata classes Switzerland",
    "Dance classes St. Gallen",
    "Bachata Fusion",
    "Bachata lessons Switzerland",
    "Latin dance St. Gallen",
    "Bachata sensual",
    "partner dance classes",
    "Wilfried Tah",
    "Tanzunterricht St. Gallen",
    "cours de bachata Suisse",
  ],
  authors: [{ name: "Coach Wil - RDF Bachata Fusion" }],
  creator: "RDF Bachata Fusion",
  publisher: "RDF Bachata Fusion",
  metadataBase: new URL("https://bachata-stgallen.ch"),
  openGraph: {
    title: "RDF Bachata Fusion - Bachata Classes in St. Gallen",
    description:
      "Join Coach Wil's professional Bachata Fusion dance classes in St. Gallen, Switzerland. Suitable for all levels - from beginners to advanced dancers.",
    type: "website",
    locale: "en_US",
    url: "https://bachata-stgallen.ch",
    siteName: "RDF Bachata Fusion",
    images: [
      {
        url: "/rdf_logo.jpeg",
        width: 1200,
        height: 630,
        alt: "RDF Bachata Fusion - Professional Dance Classes in St. Gallen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RDF Bachata Fusion - Bachata Classes in St. Gallen",
    description:
      "Join Coach Wil's professional Bachata Fusion dance classes in St. Gallen, Switzerland. All levels welcome.",
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
    canonical: "https://bachata-stgallen.ch",
    languages: {
      en: "https://bachata-stgallen.ch/en",
      de: "https://bachata-stgallen.ch/de",
      fr: "https://bachata-stgallen.ch/fr",
      "x-default": "https://bachata-stgallen.ch",
    },
  },
  verification: {
    // Google Search Console: https://search.google.com/search-console
    google: "mHWFQ1kJxeMrG7lCKGpw2c6z104LWWyOraMtsH6zlBw",

    // Bing Webmaster: https://www.bing.com/webmasters
    // (Optionnel mais recommandé pour Bing et Yahoo)
    // bing: "ton-code-bing",

    // Yandex (Optionnel - uniquement si vous ciblez la Russie)
    // yandex: "ton-code-yandex",
  },
  category: "Dance & Entertainment",
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

        {/* Schema.org structured data pour le SEO local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DanceSchool",
              name: "RDF Bachata Fusion",
              description:
                "Professional Bachata Fusion dance classes in St. Gallen",
              url: "https://bachata-stgallen.ch",
              image: "https://bachata-stgallen.ch/rdf_logo.jpeg",
              telephone: "+41774934018",
              email: "rdfbatchatafusion__will@hotmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Wildeggstrasse 16",
                addressLocality: "St. Gallen",
                postalCode: "9000",
                addressCountry: "CH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 47.4245,
                longitude: 9.3767,
              },
              areaServed: {
                "@type": "City",
                name: "St. Gallen",
              },
              instructor: {
                "@type": "Person",
                name: "Wilfried Tah",
                alternateName: "Coach Wil",
              },
              priceRange: "$",
              sameAs: [
                "https://www.instagram.com/coach_wil_84",
                "https://www.facebook.com/people/Wil-Tah/100012235066793/",
                "https://www.youtube.com/@RDF_Wil",
                "https://www.linkedin.com/in/wilfried-tah-54913a273/",
                "https://rdf-bachata-fusion.passion.io/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <header>
          <NavBar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
