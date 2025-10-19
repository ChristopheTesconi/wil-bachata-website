"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Faq.module.css";

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
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const toggle = (index) => {
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

  const faqData = [
    {
      question: "Do I need a partner to join the classes?",
      answer:
        "No partner is required! We rotate partners during class so you get to dance with different people. This also helps you learn faster and makes the class more social.",
    },
    {
      question: "I've never danced before — can I still join?",
      answer:
        "Absolutely. Our Thursday beginner class is designed for complete newcomers. We focus on fundamentals, rhythm, and connection so you can build confidence step by step.",
    },
    {
      question: "How long until I can dance socially?",
      answer:
        "That depends on you and how often you practice. For instance, many students feel comfortable dancing socially after one month of consistent training — especially with the extra support from the RDF Bachata Fusion App.",
    },
    {
      question: "What should I wear to class?",
      answer:
        "Comfortable clothes and indoor shoes (or socks with grip). Bring water to stay hydrated. No special outfit is required — just come ready to move and have fun!",
    },
    {
      question: "How do I practice outside of class?",
      answer:
        "You'll have access to practice sessions, plus the RDF Bachata Fusion App, where you can review class material, work on drills, and follow challenges to progress from home.",
    },
    {
      question: "Why is membership better than paying per class?",
      answer:
        "Memberships give you more for less. Instead of paying class by class, you get flexible access to weekly classes, app support, and party passes — making it easier to practice consistently, save money, and truly grow as a dancer.",
    },
    {
      question: "Is bachata good for fitness and social life?",
      answer:
        "Yes! Bachata helps with body coordination, musicality, and confidence — while also being a fun way to meet new people and connect in a friendly community.",
    },
  ];

  return (
    <main id="faq" className={`container-fluid ${styles.faq}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          Frequently Asked <span>Questions</span>
        </h1>
      </section>

      {/* FAQ Cards Grid */}
      <section className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {faqData.map((item, index) => (
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
        <h2>Still have questions?</h2>
        <p>
          Feel free to reach out to Coach Wil directly.
          <br />
          We're here to help you start your bachata journey!
        </p>
      </section>
    </main>
  );
}
