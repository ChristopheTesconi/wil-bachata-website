"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./About.module.css";

export default function About() {
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
        if (open[i]) {
          el.style.maxHeight = el.scrollHeight + "px";
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });
  }, [open]);

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
          <h1>About Coach Wil</h1>
          <h2>
            Building strong foundations, clear teaching, and real progress
          </h2>
        </section>

        {/* Cards Grid */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {/* Journey */}
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
                  🎵 My Dance Journey
                </h3>
              </header>
              <div
                id="panel-journey"
                role="region"
                aria-labelledby="journey-title"
                className={styles.cardContent}
                ref={contentRefs[0]}
              >
                <p>
                  I’ve been dancing Latin styles for over 15 years. During
                  COVID, I realized most people learn bachata through partner
                  work first, but real progress comes when you also train your
                  solo foundation — footwork, body movement, arm coordination,
                  timing, and musicality.
                </p>
                <p>
                  I went back to basics, drilling fundamentals repeatedly, and
                  that’s when everything started to flow better than I could
                  have expected.
                </p>
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
                  💻 RDF Bachata Fusion App
                </h3>
              </header>
              <div
                id="panel-rdf"
                role="region"
                aria-labelledby="rdf-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <p>I designed RDF for people like:</p>
                <ul>
                  <li>
                    Complete beginners who want to learn correctly from day one
                  </li>
                  <li>
                    Shy or unsure dancers who prefer building confidence first
                  </li>
                  <li>
                    Experienced dancers who stopped improving and want to
                    rebuild their foundation
                  </li>
                </ul>
                <p>
                  RDF focuses on rhythm, dance, and flow — helping everyone
                  progress at their own pace.
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
                  🏫 Teaching in St. Gallen
                </h3>
              </header>
              <div
                id="panel-teaching"
                role="region"
                aria-labelledby="teaching-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <p>
                  I’ve spent 4 years teaching in St. Gallen, grateful for every
                  student who trusted me. My partner Sandra joins regularly,
                  helping guide leaders and followers with patience, clarity,
                  and fun.
                </p>
                <p>
                  Our mission: Strong foundations, clear teaching, real
                  progress, and a supportive community. Bachata Lab is about
                  confidence, connection, fun, and growth.
                </p>
                <p>
                  Every week, I see strangers become friends, dancers smile, and
                  students gain confidence. That’s why I do this.
                </p>
                <p>
                  Let&apos;s practice, have fun, and dance with passion. I’m
                  excited to welcome you to the Bachata Lab family.
                  <br />
                  <strong>Coach Wil</strong>
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
