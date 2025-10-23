"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Faq.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function FAQ() {
  const [open, setOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
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
        if (open[i]) {
          el.style.maxHeight = el.scrollHeight + "px";
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });
  }, [open]);

  if (!t || !t.faq) {
    return null;
  }

  return (
    <main id="faq" className={`container-fluid ${styles.faq}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          {t.faq.hero.title} <span>{t.faq.hero.subtitle}</span>
        </h1>
      </section>

      {/* FAQ Cards Grid */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {t.faq.questions.map((item, index) => (
            <article
              key={index}
              className={styles.card}
              aria-labelledby={`faq-title-${index}`}
            >
              <header
                className={styles.cardHeader}
                onClick={() => toggle(index)}
              >
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[index]}
                  aria-controls={`panel-faq-${index}`}
                  aria-label={`Toggle question ${index + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(index);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[index] ? "−" : "+"}
                  </span>
                </button>
                <h3 id={`faq-title-${index}`} className={styles.cardTitle}>
                  {index + 1}. {item.question}
                </h3>
              </header>
              <div
                id={`panel-faq-${index}`}
                role="region"
                aria-labelledby={`faq-title-${index}`}
                className={styles.cardContent}
                ref={contentRefs[index]}
              >
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Outro */}
      <section className={styles.outro}>
        <h2>{t.faq.outro.title}</h2>
        <p>
          {t.faq.outro.description.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </p>
      </section>
    </main>
  );
}
