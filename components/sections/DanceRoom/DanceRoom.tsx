"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./DanceRoom.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function DanceRoom() {
  const [open, setOpen] = useState([false, false, false, false]);
  const contentRefs = [
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

  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bachata Lab Pro Membership",
    description:
      "Bachata Lab Pro Membership offers full dance training, access to RDF Bachata Fusion App, and social dance events.",
    image: "https://bachata-stgallen.ch/rdf_logo.jpeg", // ← AJOUTÉ
    brand: {
      "@type": "Brand",
      name: "Bachata Lab",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Pro Student",
        price: "110",
        priceCurrency: "CHF",
        description:
          "All Thursday Beginner Classes + Weekly Dance Practice + RDF App Part 1 + Domingo Latino Party Pass",
        availability: "https://schema.org/InStock", // ← AJOUTÉ
        url: "https://bachata-stgallen.ch", // ← AJOUTÉ
      },
      {
        "@type": "Offer",
        name: "Pro Classic",
        price: "150",
        priceCurrency: "CHF",
        description:
          "5 Flexible Classes / Month + RDF App Limited Access + Salsa Ritmo Party Pass",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Pro PartyBanger",
        price: "190",
        priceCurrency: "CHF",
        description:
          "8 Flexible Classes / Month + RDF App Laboratorium + Party Passes included",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Pro VIP",
        price: "240",
        priceCurrency: "CHF",
        description:
          "Unlimited Classes + Full RDF App Access + Multiple Party Passes + Workshop Included",
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
                <ul>
                  <li>{t.danceroom.proStudent.item1}</li>
                  <li>{t.danceroom.proStudent.item2}</li>
                  <li>{t.danceroom.proStudent.item3}</li>
                  <li>{t.danceroom.proStudent.item4}</li>
                </ul>
                <p>{t.danceroom.proStudent.price}</p>
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
                <ul>
                  <li>{t.danceroom.proClassic.item1}</li>
                  <li>{t.danceroom.proClassic.item2}</li>
                  <li>{t.danceroom.proClassic.item3}</li>
                </ul>
                <p>{t.danceroom.proClassic.price}</p>
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
                <ul>
                  <li>{t.danceroom.proPartyBanger.item1}</li>
                  <li>{t.danceroom.proPartyBanger.item2}</li>
                  <li>{t.danceroom.proPartyBanger.item3}</li>
                  <li>{t.danceroom.proPartyBanger.item4}</li>
                  <li>{t.danceroom.proPartyBanger.item5}</li>
                </ul>
                <p>{t.danceroom.proPartyBanger.price}</p>
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
                <ul>
                  <li>{t.danceroom.proVIP.item1}</li>
                  <li>{t.danceroom.proVIP.item2}</li>
                  <li>{t.danceroom.proVIP.item3}</li>
                  <li>{t.danceroom.proVIP.item4}</li>
                  <li>{t.danceroom.proVIP.item5}</li>
                  <li>{t.danceroom.proVIP.item6}</li>
                </ul>
                <p>{t.danceroom.proVIP.price}</p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.outro}>
          <p>{t.danceroom.outro}</p>
        </section>
      </main>
    </>
  );
}
