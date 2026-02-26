import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootswatch/dist/lux/bootstrap.min.css";

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

// ✅ Transformation en fonction pour accéder à locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://www.bachata-stgallen.ch"; // ✅ Avec www.

  return {
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
    metadataBase: new URL(baseUrl), // ✅ Avec www.
    openGraph: {
      title: "RDF Bachata Fusion - Bachata Classes in St. Gallen",
      description:
        "Join Coach Wil's professional Bachata Fusion dance classes in St. Gallen, Switzerland. Suitable for all levels - from beginners to advanced dancers.",
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "de" ? "de_CH" : "fr_CH",
      url: `${baseUrl}/${locale}`,
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
      canonical: `${baseUrl}/${locale}`, // ✅ Correction du typo
      languages: {
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/en`,
      },
    },
    verification: {
      google: "mHWFQ1kJxeMrG7lCKGpw2c6z104LWWyOraMtsH6zlBw",
    },
    category: "Dance & Entertainment",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <Footer />

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
            url: "https://www.bachata-stgallen.ch", // ✅ Avec www.
            image: "https://www.bachata-stgallen.ch/rdf_logo.jpeg",
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
    </div>
  );
}
