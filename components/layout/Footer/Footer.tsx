"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Footer.module.css";

interface FooterProps {
  currentLocale?: string;
}

export default function Footer({ currentLocale = "en" }: FooterProps) {
  const year = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

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
      email: "RDFBachataFusion_wil@hotmail.com",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
      home: "Home",
      aboutMe: "About Me",
      danceRoom: "Membership",
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
      email: "rdfbatchatafusion__will@hotmail.com",
      quickLinks: "Schnelllinks",
      followUs: "Folge uns",
      home: "Startseite",
      aboutMe: "Über mich",
      danceRoom: "Tanzraum",
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
      email: "rdfbatchatafusion__will@hotmail.com",
      quickLinks: "Liens rapides",
      followUs: "Suivez-nous",
      home: "Accueil",
      aboutMe: "À propos",
      danceRoom: "Salle de danse",
    },
  };

  const t = texts[currentLocale] || texts.en;

  // Vérifie si on est sur la page d'accueil
  const isHomePage =
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/de" ||
    pathname === "/fr";

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // Si on est sur une autre page (comme legal notice), navigue vers la home
      router.push(`/#${sectionId}`);
    } else {
      // Si on est déjà sur la home, scroll normalement
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToTop = () => {
    if (!isHomePage) {
      // Si on est sur une autre page, retourne à la home
      router.push("/");
    } else {
      // Si on est déjà sur la home, scroll en haut
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

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
                href="https://wa.me/41774934018?text=Hello%2C%20I%27m%20interested%20in%20Bachata%20classes"
                target="_blank"
                rel="noopener noreferrer"
                itemProp="telephone"
                aria-label={`Call us at ${t.phone}`}
              >
                {t.phone}
              </a>
            </p>
            <p>
              <a
                href="mailto:RDFBachataFusion_wil@hotmail.com"
                itemProp="email"
                aria-label={`Send email to ${t.email}`}
              >
                {t.email}
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
                <a
                  onClick={scrollToTop}
                  style={{ cursor: "pointer" }}
                  aria-label="Go to home page"
                  className={styles.footerLink}
                >
                  {t.home}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("about")}
                  style={{ cursor: "pointer" }}
                  aria-label="Learn about Wilfried"
                  className={styles.footerLink}
                >
                  {t.aboutMe}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("danceroom")}
                  style={{ cursor: "pointer" }}
                  aria-label="Visit our dance studio"
                  className={styles.footerLink}
                >
                  {t.danceRoom}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("contact")}
                  style={{ cursor: "pointer" }}
                  aria-label="Contact us for information"
                  className={styles.footerLink}
                >
                  {t.contact}
                </a>
              </li>
              <li>
                <a
                  href={
                    currentLocale === "en"
                      ? "/en/legal-notice"
                      : currentLocale === "de"
                      ? "/de/impressum"
                      : "/fr/mentions-legales"
                  }
                  aria-label="Read our legal notice and privacy policy"
                  className={styles.footerLink}
                >
                  {t.legal}
                </a>
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
              href="https://www.tiktok.com/@rdf_bachata_chanel84"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Visit our TikTok page for photos and events"
              title="Follow us on TikTok"
            >
              <i className="bi bi-tiktok" aria-hidden="true">
                TikTok
              </i>
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

        {/* Logo Section */}
        <div className={styles.footerLogoSection}>
          <div
            onClick={scrollToTop}
            className={styles.logoWrapper}
            style={{ cursor: "pointer" }}
            aria-label="Wil Bachata Home"
          >
            <Image
              src="/rdf_logo.jpeg"
              alt="Wil Bachata - Professional Bachata Dance Classes in St. Gallen"
              width={110}
              height={110}
              priority
              className={styles.footerLogo}
            />
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          {t.copyright}
          <br />
          <a
            href="https://christophetesconidev.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.designCredit}
          >
            This website was designed and created by christophetesconidev.com
          </a>
        </p>
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
            url: "https://bachata-stgallen.ch",
            logo: "https://bachata-stgallen.ch/rdf_logo.jpeg",
            image: "https://bachata-stgallen.ch/rdf_logo.jpeg",
            telephone: "+41774934018",
            email: "rdfbatchatafusion__will@hotmail.com",
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
