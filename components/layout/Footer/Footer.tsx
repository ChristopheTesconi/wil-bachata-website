"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  // Récupérer la locale actuelle
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  // Charger les traductions
  const t = getDictionary(currentLocale);

  // Vérifie si on est sur la page d'accueil
  const isHomePage =
    pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // Si on est sur une autre page, navigue vers la home avec la bonne langue
      router.push(`/${currentLocale}/#${sectionId}`);
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
      router.push(`/${currentLocale}`);
    } else {
      // Si on est déjà sur la home, scroll en haut
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!t || !t.footer) {
    return null;
  }

  return (
    <footer
      className={styles.footer}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className={styles.footerContainer}>
        {/* Section About/Tagline */}
        <div className={styles.footerSection}>
          <h2 className={styles.footerBrand}>{t.footer.brand}</h2>
          <p className={styles.footerTagline}>{t.footer.tagline}</p>
          <address className={styles.footerAddress}>
            <p
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="addressLocality">{t.footer.address}</span>
            </p>
            <p>
              <a
                href="https://wa.me/41774934018?text=Hello%2C%20I%27m%20interested%20in%20Bachata%20classes"
                target="_blank"
                rel="noopener noreferrer"
                itemProp="telephone"
                aria-label={`Call us at ${t.footer.phone}`}
              >
                {t.footer.phone}
              </a>
            </p>
            <p>
              <a
                href="mailto:Rdfbachatafusion_wil@hotmail.com"
                itemProp="email"
                aria-label={`Send email to ${t.footer.email}`}
              >
                {t.footer.email}
              </a>
            </p>
          </address>
        </div>

        {/* Section Quick Links */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>{t.footer.quickLinks}</h3>
          <nav aria-label="Footer navigation">
            <ul className={styles.footerLinks}>
              <li>
                <a
                  onClick={scrollToTop}
                  style={{ cursor: "pointer" }}
                  aria-label="Go to home page"
                  className={styles.footerLink}
                >
                  {t.footer.home}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("about")}
                  style={{ cursor: "pointer" }}
                  aria-label="Learn about Wilfried"
                  className={styles.footerLink}
                >
                  {t.footer.aboutMe}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("danceroom")}
                  style={{ cursor: "pointer" }}
                  aria-label="Visit our dance studio"
                  className={styles.footerLink}
                >
                  {t.footer.membership}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("collaborators")}
                  style={{ cursor: "pointer" }}
                  aria-label="View our collaborators"
                  className={styles.footerLink}
                >
                  {t.footer.collaborators}
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollToSection("contact")}
                  style={{ cursor: "pointer" }}
                  aria-label="Contact us for information"
                  className={styles.footerLink}
                >
                  {t.footer.contact}
                </a>
              </li>
              <li>
                <a
                  href="https://eventfrog.ch/en/events.html?searchTerm=Bachata+Lab+St+gallen"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book your class on EventFrog"
                  className={styles.footerLink}
                >
                  {t.footer.bookings}
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
                  {t.footer.legal}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Section Social Media */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerHeading}>{t.footer.followUs}</h3>
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
              title={`${t.footer.whatsapp}: ${t.footer.phone}`}
              className={styles.socialLink}
            >
              <i className="bi bi-whatsapp" aria-hidden="true"></i>
              <span>{t.footer.whatsapp}</span>
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
              <span>{t.footer.instagram}</span>
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
              <span>{t.footer.facebook}</span>
            </a>
            <a
              href="https://www.tiktok.com/@rdf_bachata_chanel84"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Visit our TikTok page for photos and events"
              title="Follow us on TikTok"
            >
              <i className="bi bi-tiktok" aria-hidden="true"></i>
              <span>{t.footer.tiktok}</span>
            </a>
            <a
              href="https://rdf-bachata-fusion.passion.io"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Download our mobile app for class schedules and videos"
              title="Download our app"
            >
              <i className="bi bi-phone" aria-hidden="true"></i>
              <span>{t.footer.app}</span>
            </a>
            <a
              href="https://www.skool.com/rdf-bachata-fusion-ch-2232/about?ref=8b30f0ec24234217bab5ed45cd07e4d9"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Join our Skool Community"
              title="Join our Skool Community"
            >
              <i className="bi bi-people" aria-hidden="true"></i>
              <span>{t.footer.skool}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/wilfried-tah-54913a273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Connect with Coach Wil on LinkedIn"
              title="Connect on LinkedIn"
            >
              <i className="bi bi-linkedin" aria-hidden="true"></i>
              <span>{t.footer.linkedin}</span>
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
          © {year} {t.footer.brand}. {t.footer.copyright}
          <br />
          <a
            href="https://christophetesconidev.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.designCredit}
          >
            {t.footer.designCredit}
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
              streetAddress: "Wildeggstrasse 16",
              addressLocality: "St. Gallen",
              postalCode: "9000",
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
