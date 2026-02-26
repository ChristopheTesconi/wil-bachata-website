import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RDF Bachata Fusion",
  description: "Professional Bachata Dance Classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon_512x512.png" sizes="any" />
        <link rel="apple-touch-icon" href="/rdf_fav.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#E91E63" />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
