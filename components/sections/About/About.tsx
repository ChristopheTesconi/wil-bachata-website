"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./About.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function About() {
  const [open, setOpen] = useState([false, false, false]);
  const contentRefs = [
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
        if (open[i]) {
          el.style.maxHeight = el.scrollHeight + "px";
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });
  }, [open]);

  if (!t || !t.home) {
    return null;
  }

  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Coach Wil",
    jobTitle: "Bachata Instructor",
    description:
      "Coach Wil teaches Bachata in St. Gallen, focusing on strong solo foundations, rhythm, and confidence-building.",
    url: "https://bachata-stgallen.ch",
    alumniOf: "Bachata Lab",
    knowsAbout: [
      "Bachata",
      "Latin Dance",
      "Dance Fundamentals",
      "Partner Work",
    ],
    sameAs: [
      "https://www.instagram.com/coach_wil_84",
      "https://www.facebook.com/people/Wil-Tah/100012235066793/",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="about" className={`container-fluid ${styles.about}`}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>{t.about.hero.title}</h1>
          <h2>{t.about.hero.subtitle}</h2>
        </section>

        {/* Cards Grid */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {/* Journey - UPDATED */}
            <article className={styles.card} aria-labelledby="journey-title">
              <header className={styles.cardHeader} onClick={() => toggle(0)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[0]}
                  aria-controls="panel-journey"
                  aria-label="Toggle journey"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(0);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[0] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="journey-title" className={styles.cardTitle}>
                  {t.about.journey.title}
                </h3>
              </header>
              <div
                id="panel-journey"
                role="region"
                aria-labelledby="journey-title"
                className={styles.cardContent}
                ref={contentRefs[0]}
              >
                <p>{t.about.journey.p1}</p>
                <p>{t.about.journey.p2}</p>
                <p>{t.about.journey.p3}</p>
                <p>{t.about.journey.p4}</p>
              </div>
            </article>

            {/* RDF Bachata Fusion */}
            <article className={styles.card} aria-labelledby="rdf-title">
              <header className={styles.cardHeader} onClick={() => toggle(1)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[1]}
                  aria-controls="panel-rdf"
                  aria-label="Toggle RDF Bachata Fusion"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(1);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[1] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="rdf-title" className={styles.cardTitle}>
                  {t.about.rdf.title}
                </h3>
              </header>
              <div
                id="panel-rdf"
                role="region"
                aria-labelledby="rdf-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <p>
                  <strong>{t.about.rdf.subtitle}</strong>
                </p>
                <p>{t.about.rdf.intro}</p>

                <p>
                  <strong>{t.about.rdf.insideApp}</strong>
                </p>

                <h4>{t.about.rdf.challenge.title}</h4>
                <p>{t.about.rdf.challenge.description}</p>
                <ul>
                  {t.about.rdf.challenge.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <p>
                  {t.about.rdf.challenge.part1}
                  <br />
                  {t.about.rdf.challenge.part2}
                </p>

                <h4>{t.about.rdf.laboratorium.title}</h4>
                <p>{t.about.rdf.laboratorium.description}</p>
                <ul>
                  {t.about.rdf.laboratorium.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <p>{t.about.rdf.laboratorium.conclusion}</p>

                <h4>{t.about.rdf.whyExists.title}</h4>
                <p>
                  {t.about.rdf.whyExists.reason1}
                  <br />
                  {t.about.rdf.whyExists.reason2}
                  <br />
                  {t.about.rdf.whyExists.reason3}
                </p>

                <h4>{t.about.rdf.cta.title}</h4>
                <p>{t.about.rdf.cta.description}</p>
                <p>
                  <a
                    href={t.about.rdf.cta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.about.rdf.cta.linkText}
                  </a>
                </p>
              </div>
            </article>

            {/* Teaching in St. Gallen */}
            <article className={styles.card} aria-labelledby="teaching-title">
              <header className={styles.cardHeader} onClick={() => toggle(2)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[2]}
                  aria-controls="panel-teaching"
                  aria-label="Toggle teaching"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(2);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[2] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="teaching-title" className={styles.cardTitle}>
                  {t.about.teaching.title}
                </h3>
              </header>
              <div
                id="panel-teaching"
                role="region"
                aria-labelledby="teaching-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <p>{t.about.teaching.p1}</p>

                <p>{t.about.teaching.p2}</p>
                <ul>
                  {t.about.teaching.p2List.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <p>{t.about.teaching.p3}</p>
                <p>{t.about.teaching.p4}</p>

                <p>
                  <strong>{t.about.teaching.mission.title}</strong>{" "}
                  {t.about.teaching.mission.content}
                </p>
                <p>{t.about.teaching.mission.extra}</p>

                <p>
                  <strong>{t.about.teaching.personalNote.title}</strong>
                </p>
                <p>{t.about.teaching.personalNote.content}</p>
                <p>{t.about.teaching.personalNote.reason}</p>
                <p>{t.about.teaching.personalNote.gratitude}</p>
                <p>{t.about.teaching.personalNote.invitation}</p>
                <p>{t.about.teaching.personalNote.closing}</p>

                <p>
                  <strong>{t.about.teaching.signature}</strong>
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
