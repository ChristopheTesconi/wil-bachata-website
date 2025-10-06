"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [open, setOpen] = useState([false, false, false]);
  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    contentRefs.forEach((ref, i) => {
      const el = ref.current;
      if (el) {
        el.style.maxHeight = open[i] ? el.scrollHeight + "px" : "0px";
      }
    });
  }, [open]);

  // Structured Data SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wil Bachata",
    url: "https://wilbachata.com",
    logo: "https://wilbachata.com/rdf_logo.jpeg",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+41 77 493 40 18",
        contactType: "customer support",
        availableLanguage: "en",
      },
    ],
    sameAs: [
      "https://www.instagram.com/coach_wil_84",
      "https://www.facebook.com/people/Wil-Tah/100012235066793/",
      "https://rdf-bachata-fusion.passion.io",
    ],
    location: [
      {
        "@type": "Place",
        name: "Bachata Lab Saint-Gallen",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Unterstrasse 22",
          addressLocality: "St. Gallen",
          postalCode: "9000",
          addressCountry: "CH",
        },
      },
      {
        "@type": "Place",
        name: "Coach Wil Studio",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Wildeggstrasse 16",
          addressLocality: "St. Gallen",
          postalCode: "9000",
          addressCountry: "CH",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className={`container-fluid ${styles.contact}`}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>Contact & Booking</h1>
          <h2>
            Have questions? Want to join a class or start private training?
          </h2>
        </section>

        {/* Cards Section */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {/* Contact Info */}
            <article className={styles.card} aria-labelledby="contact-title">
              <header className={styles.cardHeader} onClick={() => toggle(0)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[0]}
                  aria-controls="panel-contact"
                  aria-label="Toggle Contact Info"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(0);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[0] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="contact-title" className={styles.cardTitle}>
                  📱 Contact Info
                </h3>
              </header>
              <div
                id="panel-contact"
                role="region"
                aria-labelledby="contact-title"
                className={styles.cardContent}
                ref={contentRefs[0]}
              >
                <ul>
                  <li>
                    📱 WhatsApp / Call:{" "}
                    <a
                      href="https://wa.me/41774934018?text=Hello%2C%20I%27m%20interested%20in%20Bachata%20classes"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +41 77 493 40 18
                    </a>
                  </li>
                  <li>📧 Email: contact@wilbachata.com</li>
                  <li>
                    📸 Instagram:{" "}
                    <a
                      href="https://www.instagram.com/coach_wil_84"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @coach_wil_84
                    </a>
                  </li>
                  <li>
                    📘 Facebook:{" "}
                    <a
                      href="https://www.facebook.com/people/Wil-Tah/100012235066793/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Wil Bachata
                    </a>
                  </li>
                </ul>
              </div>
            </article>

            {/* Studio Locations */}
            <article className={styles.card} aria-labelledby="studio-title">
              <header className={styles.cardHeader} onClick={() => toggle(1)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[1]}
                  aria-controls="panel-studio"
                  aria-label="Toggle Studio Locations"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(1);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[1] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="studio-title" className={styles.cardTitle}>
                  🏢 Studio Locations
                </h3>
              </header>
              <div
                id="panel-studio"
                role="region"
                aria-labelledby="studio-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <h4>Group Classes — Bachata Lab Saint-Gallen</h4>
                <p>
                  Move Box Studio
                  <br />
                  Unterstrasse 22, 9000 St. Gallen
                  <br />
                  Parking available
                  <br />
                  Easy access from Davidstrasse stop
                </p>

                <h4>Private Classes — Coach Wil Studio</h4>
                <p>
                  Wildeggstrasse 16, 9000 St. Gallen
                  <br />
                  Available Tuesday–Friday (13:00–17:00) & Saturday (10:00–12:00
                  / 13:00–18:00)
                  <br />
                  By appointment only
                </p>
              </div>
            </article>

            {/* Private Coaching */}
            <article className={styles.card} aria-labelledby="coaching-title">
              <header className={styles.cardHeader} onClick={() => toggle(2)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[2]}
                  aria-controls="panel-coaching"
                  aria-label="Toggle Private Coaching"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(2);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[2] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="coaching-title" className={styles.cardTitle}>
                  🤝 Private Coaching
                </h3>
              </header>
              <div
                id="panel-coaching"
                role="region"
                aria-labelledby="coaching-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <p>
                  Want faster progress or personal guidance? I offer 1:1 or 2:1
                  private sessions for:
                </p>
                <ul>
                  <li>Foundation & body movement training</li>
                  <li>Lead & follow technique</li>
                  <li>Styling, musicality & flow</li>
                  <li>Wedding dance or performance preparation</li>
                </ul>
                <p>
                  Just send me a message with: <br />
                  <em>“Private class + your availability”</em>
                  <br />
                  and I’ll propose the best options for you.
                </p>
                <p>
                  I look forward to dancing with you soon!
                  <br />
                  Coach Wil
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
