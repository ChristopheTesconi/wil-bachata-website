"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./DanceRoom.module.css";

export default function DanceRoom() {
  const [open, setOpen] = useState([false, false, false, false]);
  const contentRefs = [
    useRef<HTMLDivElement>(null),
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

  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bachata Lab Pro Membership",
    description:
      "Bachata Lab Pro Membership offers full dance training, access to RDF Bachata Fusion App, and social dance events.",
    brand: "Bachata Lab",
    offers: [
      {
        "@type": "Offer",
        name: "Pro Student",
        price: "110",
        priceCurrency: "CHF",
        description:
          "All Thursday Beginner Classes + Weekly Dance Practice + RDF App Part 1 + Domingo Latino Party Pass",
      },
      {
        "@type": "Offer",
        name: "Pro Classic",
        price: "150",
        priceCurrency: "CHF",
        description:
          "5 Flexible Classes / Month + RDF App Limited Access + Salsa Ritmo Party Pass",
      },
      {
        "@type": "Offer",
        name: "Pro PartyBanger",
        price: "190",
        priceCurrency: "CHF",
        description:
          "8 Flexible Classes / Month + RDF App Laboratorium + Party Passes included",
      },
      {
        "@type": "Offer",
        name: "Pro VIP",
        price: "240",
        priceCurrency: "CHF",
        description:
          "Unlimited Classes + Full RDF App Access + Multiple Party Passes + Workshop Included",
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
          <h1>Bachata Lab Pro Membership</h1>
          <h2>Full dance experience, learning, practicing, and applying</h2>
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
                  🎓 Pro Student (≤26y)
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
                  <li>✅ All Thursday Beginner Classes</li>
                  <li>✅ Weekly Dance Practice Included</li>
                  <li>✅ RDF App Bachata step challenge Part 1</li>
                  <li>✅ Domingo Latino Party Pass</li>
                </ul>
                <p>💳 110 CHF / month</p>
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
                  ⭐ Pro Classic
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
                  <li>✅ 5 Flexible Classes / Month</li>
                  <li>
                    ✅ Access to RDF App – Limited access to Laboratorium + BSC
                    Part 1
                  </li>
                  <li>✅ Salsa Ritmo Party Pass</li>
                </ul>
                <p>💳 150 CHF / month</p>
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
                  🔥 Pro PartyBanger
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
                  <li>✅ 8 Flexible Classes / Month</li>
                  <li>✅ Access to RDF App Laboratorium + BSC Part 1</li>
                  <li>✅ Salsa Ritmo Party Pass (x1)</li>
                  <li>✅ Domingo Latino Party Pass (x1)</li>
                  <li>✅ Bachata Loca Party Pass (x1)</li>
                </ul>
                <p>💳 190 CHF / month</p>
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
                  👑 Pro VIP
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
                  <li>✅ Unlimited Classes (Monday / Thursday / Friday)</li>
                  <li>✅ Full Access to RDF App — All Modules Unlocked</li>
                  <li>✅ Salsa Ritmo Party Pass (x1)</li>
                  <li>✅ Domingo Latino Party Pass (x2)</li>
                  <li>✅ Bachata Loca Party Pass + Workshop Included (x1)</li>
                </ul>
                <p>💳 240 CHF / month</p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.outro}>
          <p>Let&apos;s start here and join the journey!</p>
        </section>
      </main>
    </>
  );
}
