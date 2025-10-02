"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
  currentLocale?: string;
}

export default function Footer({ currentLocale = "en" }: FooterProps) {
  const year = new Date().getFullYear();

  const texts: Record<string, Record<string, string>> = {
    en: {
      contact: "Contact Us",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      legal: "Legal Notice",
      copyright: `© ${year} Wil Bachata. All rights reserved.`,
      tagline:
        "Professional Bachata Fusion Dance Classes in St. Gallen, Switzerland",
      address: "St. Gallen, Switzerland",
      phone: "+41 77 493 40 18",
      email: "Contact via WhatsApp",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
    },
    de: {
      contact: "Kontakt",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      legal: "Impressum",
      copyright: `© ${year} Wil Bachata. Alle Rechte vorbehalten.`,
      tagline:
        "Professioneller Bachata Fusion Tanzunterricht in St. Gallen, Schweiz",
      address: "St. Gallen, Schweiz",
      phone: "+41 77 493 40 18",
      email: "Kontakt über WhatsApp",
      quickLinks: "Schnelllinks",
      followUs: "Folge uns",
    },
    fr: {
      contact: "Contact",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      facebook: "Facebook",
      legal: "Mentions légales",
      copyright: `© ${year} Wil Bachata. Tous droits réservés.`,
      tagline:
        "Cours de danse Bachata Fusion professionnels à St. Gallen, Suisse",
      address: "St. Gallen, Suisse",
      phone: "+41 77 493 40 18",
      email: "Contact via WhatsApp",
      quickLinks: "Liens rapides",
      followUs: "Suivez-nous",
    },
  };

  const t = texts[currentLocale] || texts.en;

  return (
    <footer
      className={styles.footer}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className={styles.footerContainer}>
        {/* Section About/Tagline */}
        <div className={styles.footerSection}>
          <h2 className={styles.footerBrand}>Wil Bachata</h2>
          <p className={styles.footerTagline}>{t.tagline}</p>
          <address className={styles.footerAddress}>
            <p
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="addressLocality">{t.address}</span>
            </p>
            <p>
              <a
                href="tel:+41774934018"
                itemProp="telephone"
                aria-label={`Call us at ${t.phone}`}
              >
                {t.phone}
              </a>
            </p>
          </address>
        </div>

        {/* Section Quick Links */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>{t.quickLinks}</h3>
          <nav aria-label="Footer navigation">
            <ul className={styles.footerLinks}>
              <li>
                <Link href={`/${currentLocale}`} aria-label="Go to home page">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/about`}
                  aria-label="Learn about Wilfried"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/danceroom`}
                  aria-label="Visit our dance studio"
                >
                  Dance Room
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/contact`}
                  aria-label="Contact us for information"
                >
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/mentions-legales`}
                  aria-label="Read our legal notice and privacy policy"
                >
                  {t.legal}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Section Social Media */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>{t.followUs}</h3>
          <div
            className={styles.socialLinks}
            role="group"
            aria-label="Social media links"
          >
            <a
              href="https://wa.me/41774934018?text=Hello%2C%20I%27m%20interested%20in%20Bachata%20classes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp for class inquiries"
              title={`${t.whatsapp}: ${t.phone}`}
              className={styles.socialLink}
            >
              <i className="bi bi-whatsapp" aria-hidden="true"></i>
              <span>{t.whatsapp}</span>
            </a>
            <a
              href="https://www.instagram.com/coach_wil_84"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram for dance videos and updates"
              title="Follow @coach_wil_84 on Instagram"
              className={styles.socialLink}
            >
              <i className="bi bi-instagram" aria-hidden="true"></i>
              <span>{t.instagram}</span>
            </a>
            <a
              href="https://www.facebook.com/people/Wil-Tah/100012235066793/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page for photos and events"
              title="Like us on Facebook"
              className={styles.socialLink}
            >
              <i className="bi bi-facebook" aria-hidden="true"></i>
              <span>{t.facebook}</span>
            </a>
            <a
              href="https://rdf-bachata-fusion.passion.io"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Download our mobile app for class schedules and videos"
              title="Download our app"
            >
              <i className="bi bi-phone" aria-hidden="true">
                App
              </i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>{t.copyright}</p>
      </div>

      {/* Schema.org Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DanceGroup",
            name: "Wil Bachata",
            description:
              "Professional Bachata Fusion dance classes in St. Gallen, Switzerland",
            url: "https://wilbachata.com",
            logo: "https://wilbachata.com/rdf_logo.jpeg",
            image: "https://wilbachata.com/rdf_logo.jpeg",
            telephone: "+41774934018",
            address: {
              "@type": "PostalAddress",
              addressLocality: "St. Gallen",
              addressCountry: "CH",
            },
            sameAs: [
              "https://www.facebook.com/people/Wil-Tah/100012235066793/",
              "https://www.instagram.com/coach_wil_84",
              "https://rdf-bachata-fusion.passion.io",
            ],
            founder: {
              "@type": "Person",
              name: "Wilfried",
            },
            areaServed: {
              "@type": "City",
              name: "St. Gallen",
            },
            priceRange: "$$",
          }),
        }}
      />
    </footer>
  );
}
