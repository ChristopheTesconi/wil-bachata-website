// DanceRoom.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./DanceRoom.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function DanceRoom() {
  const [open, setOpen] = useState([false, false, false, false, false]);
  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const pathname = usePathname();

  // Récupérer la locale actuelle
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  // Charger les traductions
  const t = getDictionary(currentLocale);

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

  if (!t || !t.home) {
    return null;
  }

  // Structured Data pour SEO - UPDATED
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bachata Lab Pro Membership",
    description:
      "Bachata Lab Pro Membership offers full dance training, access to RDF Bachata Fusion App, and social dance events.",
    image: "https://bachata-stgallen.ch/rdf_logo.jpeg",
    brand: {
      "@type": "Brand",
      name: "Bachata Lab",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Bachata Lab Pro Student",
        price: "110",
        priceCurrency: "CHF",
        description:
          "4 flexible classes per month + RDF App Laboratorium access for students up to 26 years old",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Bachata Lab Pro Classic",
        price: "150",
        priceCurrency: "CHF",
        description:
          "5 Flexible Classes per month + RDF App + Salsa Ritmo Workshop and Party Pass",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Bachata Lab Pro PartyBanger",
        price: "190",
        priceCurrency: "CHF",
        description:
          "8 Flexible Classes + RDF App + Bachata Step Challenge Part 1 + Multiple Party Passes",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Bachata Lab Pro VIP",
        price: "240",
        priceCurrency: "CHF",
        description:
          "Unlimited Classes + Full RDF App + Multiple Party Passes + Private Coaching",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="danceroom" className={`container-fluid ${styles.danceRoom}`}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>{t.danceroom.hero.title}</h1>
          <h2>{t.danceroom.hero.subtitle}</h2>
        </section>

        {/* Cards Grid */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {/* Pro Student */}
            <article className={styles.card} aria-labelledby="student-title">
              <header className={styles.cardHeader} onClick={() => toggle(0)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[0]}
                  aria-controls="panel-student"
                  aria-label="Toggle Pro Student"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(0);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[0] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="student-title" className={styles.cardTitle}>
                  {t.danceroom.proStudent.title}
                </h3>
              </header>
              <div
                id="panel-student"
                role="region"
                aria-labelledby="student-title"
                className={styles.cardContent}
                ref={contentRefs[0]}
              >
                <p className={styles.description}>
                  {t.danceroom.proStudent.description}
                </p>
                <ul>
                  {t.danceroom.proStudent.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>{t.danceroom.proStudent.price}</p>
              </div>
            </article>

            {/* Pro Classic */}
            <article className={styles.card} aria-labelledby="classic-title">
              <header className={styles.cardHeader} onClick={() => toggle(1)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[1]}
                  aria-controls="panel-classic"
                  aria-label="Toggle Pro Classic"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(1);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[1] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="classic-title" className={styles.cardTitle}>
                  {t.danceroom.proClassic.title}
                </h3>
              </header>
              <div
                id="panel-classic"
                role="region"
                aria-labelledby="classic-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <p className={styles.description}>
                  {t.danceroom.proClassic.description}
                </p>
                <ul>
                  {t.danceroom.proClassic.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>{t.danceroom.proClassic.price}</p>
              </div>
            </article>

            {/* Pro PartyBanger */}
            <article className={styles.card} aria-labelledby="party-title">
              <header className={styles.cardHeader} onClick={() => toggle(2)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[2]}
                  aria-controls="panel-party"
                  aria-label="Toggle Pro PartyBanger"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(2);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[2] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="party-title" className={styles.cardTitle}>
                  {t.danceroom.proPartyBanger.title}
                </h3>
              </header>
              <div
                id="panel-party"
                role="region"
                aria-labelledby="party-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <p className={styles.description}>
                  {t.danceroom.proPartyBanger.description}
                </p>
                <ul>
                  {t.danceroom.proPartyBanger.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>
                  {t.danceroom.proPartyBanger.price}
                </p>
              </div>
            </article>

            {/* Pro VIP */}
            <article className={styles.card} aria-labelledby="vip-title">
              <header className={styles.cardHeader} onClick={() => toggle(3)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[3]}
                  aria-controls="panel-vip"
                  aria-label="Toggle Pro VIP"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(3);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[3] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="vip-title" className={styles.cardTitle}>
                  {t.danceroom.proVIP.title}
                </h3>
              </header>
              <div
                id="panel-vip"
                role="region"
                aria-labelledby="vip-title"
                className={styles.cardContent}
                ref={contentRefs[3]}
              >
                <p className={styles.description}>
                  {t.danceroom.proVIP.description}
                </p>
                <ul>
                  {t.danceroom.proVIP.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>{t.danceroom.proVIP.price}</p>
              </div>
            </article>

            {/* Good to Know */}
            <article className={styles.card} aria-labelledby="goodtoknow-title">
              <header className={styles.cardHeader} onClick={() => toggle(4)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[4]}
                  aria-controls="panel-goodtoknow"
                  aria-label="Toggle Good to Know"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(4);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[4] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="goodtoknow-title" className={styles.cardTitle}>
                  {t.danceroom.goodToKnow.title}
                </h3>
              </header>
              <div
                id="panel-goodtoknow"
                role="region"
                aria-labelledby="goodtoknow-title"
                className={styles.cardContent}
                ref={contentRefs[4]}
              >
                <ul>
                  {t.danceroom.goodToKnow.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p>
                  <strong>Eventfrog Link:</strong>
                  <br />
                  <a
                    href={t.danceroom.goodToKnow.eventfrogLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.danceroom.goodToKnow.eventfrogLink}
                  </a>
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
