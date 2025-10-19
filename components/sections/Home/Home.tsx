"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Home.module.css";

export default function Home() {
  const [open, setOpen] = useState([false, false, false, false]);
  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];

      // Si on ferme la carte vidéo (index 3), on arrête la vidéo
      if (index === 3 && next[index] === false && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

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
    "@type": "DanceGroup",
    name: "RDF Bachata Fusion by Coach Wil",
    description:
      "Bachata Lab St. Gallen - Weekly Group Classes for all levels taught by Coach Wil",
    url: "https://bachata-stgallen.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unterstrasse 22",
      addressLocality: "St. Gallen",
      postalCode: "9000",
      addressCountry: "CH",
    },
    location: {
      "@type": "Place",
      name: "MoveBox Studio",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unterstrasse 22",
        addressLocality: "St. Gallen",
        postalCode: "9000",
        addressCountry: "CH",
      },
    },
    founder: {
      "@type": "Person",
      name: "Coach Wil",
      jobTitle: "Bachata Instructor",
    },
    offers: [
      {
        "@type": "Offer",
        name: "First Time Class",
        price: "20",
        priceCurrency: "CHF",
        description: "Special price for first-time students",
      },
      {
        "@type": "Offer",
        name: "Early Bird",
        price: "35",
        priceCurrency: "CHF",
        description: "Book via EventFrog",
      },
      {
        "@type": "Offer",
        name: "At the Door",
        price: "40",
        priceCurrency: "CHF",
        description: "Cash or TWINT accepted",
      },
    ],
    event: [
      {
        "@type": "DanceEvent",
        name: "Bachata Intermediate Class",
        description: "Monthly focused combination for intermediate dancers",
        startDate: "2025-10-06T20:30",
        endDate: "2025-10-06T22:30",
        eventSchedule: {
          "@type": "Schedule",
          byDay: "Monday",
          startTime: "20:30",
          endTime: "22:30",
        },
        location: {
          "@type": "Place",
          name: "MoveBox Studio",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Unterstrasse 22",
            addressLocality: "St. Gallen",
            postalCode: "9000",
            addressCountry: "CH",
          },
        },
        offers: {
          "@type": "Offer",
          price: "35",
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "DanceEvent",
        name: "Bachata Beginner Class + Practice",
        description: "Learn basics and practice session for beginners",
        startDate: "2025-10-09T20:30",
        endDate: "2025-10-09T22:30",
        eventSchedule: {
          "@type": "Schedule",
          byDay: "Thursday",
          startTime: "20:30",
          endTime: "22:30",
        },
        location: {
          "@type": "Place",
          name: "MoveBox Studio",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Unterstrasse 22",
            addressLocality: "St. Gallen",
            postalCode: "9000",
            addressCountry: "CH",
          },
        },
        offers: {
          "@type": "Offer",
          price: "35",
          priceCurrency: "CHF",
        },
      },
      {
        "@type": "DanceEvent",
        name: "Bachata Open Level Class",
        description: "Fun drills, partnerwork, musical flow - everyone welcome",
        startDate: "2025-10-10T20:30",
        endDate: "2025-10-10T22:30",
        eventSchedule: {
          "@type": "Schedule",
          byDay: "Friday",
          startTime: "20:30",
          endTime: "22:30",
        },
        location: {
          "@type": "Place",
          name: "MoveBox Studio",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Unterstrasse 22",
            addressLocality: "St. Gallen",
            postalCode: "9000",
            addressCountry: "CH",
          },
        },
        offers: {
          "@type": "Offer",
          price: "35",
          priceCurrency: "CHF",
        },
      },
    ],
  };

  const openGoogleMaps = () => {
    const address = encodeURIComponent(
      "MoveBox Studio, Unterstrasse 22, 9000 St. Gallen"
    );
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
      "_blank"
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="home" className={`container-fluid ${styles.home}`}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1>
            Bachata Lab St. Gallen <span>by Coach Wil</span>
          </h1>
          <h2> RDF Bachata Fusion – Weekly Group Classes</h2>
        </section>

        {/* Cards Grid */}
        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {/* Weekly Classes */}
            <article className={styles.card} aria-labelledby="weekly-title">
              <header className={styles.cardHeader} onClick={() => toggle(0)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[0]}
                  aria-controls="panel-weekly"
                  aria-label="Toggle weekly classes"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(0);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[0] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="weekly-title" className={styles.cardTitle}>
                  🗓 Weekly Classes
                </h3>
              </header>
              <div
                id="panel-weekly"
                role="region"
                aria-labelledby="weekly-title"
                className={styles.cardContent}
                ref={contentRefs[0]}
              >
                <div className={styles.classItem}>
                  <h4>Monday – Intermediate (20:30–22:30)</h4>
                  <p>
                    We focus on one combination for the whole month. This helps
                    you truly learn the technique, control your body, and dance
                    it with confidence and flow.
                  </p>
                </div>
                <div className={styles.classItem}>
                  <h4>Thursday – Beginner + Practice (20:30–22:30)</h4>
                  <p>
                    <strong>20:30–21:30:</strong> Learn partnerwork basics,
                    rhythm, body movement, and connection.
                    <br />
                    <strong>21:30–22:30:</strong> Practice in a relaxed space —
                    grow at your own pace.
                  </p>
                </div>
                <div className={styles.classItem}>
                  <h4>Friday – Open Level (20:30–22:30)</h4>
                  <p>
                    Fun drills, partnerwork, musical flow — everyone is welcome!
                  </p>
                  <div className={styles.friday}>
                    <p>
                      💡 <strong>Every last Friday of the month:</strong>
                      <br />
                      <em>20:30–21:30:</em> Styling Class – express yourself and
                      build confidence
                      <br />
                      <em>21:30–22:30:</em> Social Practice – just dance, have
                      fun, no pressure
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Prices */}
            <article className={styles.card} aria-labelledby="prices-title">
              <header className={styles.cardHeader} onClick={() => toggle(1)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[1]}
                  aria-controls="panel-prices"
                  aria-label="Toggle prices"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(1);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[1] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="prices-title" className={styles.cardTitle}>
                  💰 Prices
                </h3>
              </header>
              <div
                id="panel-prices"
                role="region"
                aria-labelledby="prices-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <ul>
                  <li>
                    <strong>Early Bird:</strong> 35 CHF (via EventFrog)
                  </li>
                  <li>
                    <strong>At the Door:</strong> 40 CHF (cash or TWINT)
                  </li>
                  <li>
                    <strong>First Time?</strong> → Only 20 CHF
                  </li>
                </ul>
                <p>
                  🔥 Want to come more than 4x per month?
                  <br />
                  Membership gives you <strong>more for less</strong>.
                  <br />
                  Bachata Lab Pro Memberships start from{" "}
                  <strong>150–240 CHF/month</strong>.
                  <br />→ Includes multiple classes, app access, and party
                  passes.
                </p>
                <p>
                  <em>
                    (Ask me for details — I&apos;ll guide you to the best
                    option)
                  </em>
                </p>
              </div>
            </article>

            {/* Location */}
            <article className={styles.card} aria-labelledby="location-title">
              <header className={styles.cardHeader} onClick={() => toggle(2)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[2]}
                  aria-controls="panel-location"
                  aria-label="Toggle location"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(2);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[2] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="location-title" className={styles.cardTitle}>
                  📍 Location
                </h3>
              </header>
              <div
                id="panel-location"
                role="region"
                aria-labelledby="location-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <address
                  className={styles.address}
                  onClick={openGoogleMaps}
                  style={{ cursor: "pointer" }}
                >
                  <span className={styles.mapIcon}>📍</span>
                  MoveBox Studio <br />
                  Unterstrasse 22, 9000 St. Gallen
                </address>
                <ul>
                  <li>✅ Easy access from Davidstrasse</li>
                  <li>✅ Parking available</li>
                  <li>✅ Clean, spacious, and full of good energy</li>
                </ul>
              </div>
            </article>

            {/* Video */}
            <article className={styles.card} aria-labelledby="video-title">
              <header className={styles.cardHeader} onClick={() => toggle(3)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[3]}
                  aria-controls="panel-video"
                  aria-label="Toggle video"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(3);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[3] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="video-title" className={styles.cardTitle}>
                  🎥 Video
                </h3>
              </header>
              <div
                id="panel-video"
                role="region"
                aria-labelledby="video-title"
                className={styles.cardContent}
                ref={contentRefs[3]}
              >
                <div className={styles.videoWrapper}>
                  <video controls ref={videoRef}>
                    <source src="/wil_sandra4.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Outro */}
        <section className={styles.outro}>
          <h2>Welcome to Bachata Lab St. Gallen</h2>
          <p>
            We practice, have fun, and support each other.
            <br />
            Come try a class and feel the difference.
          </p>
          <p>
            <strong>See you on the dance floor! 💃</strong>
            <br />
            Coach Wil
          </p>
          <div className={styles.outroImage}>
            <Image
              src="/rythm_dance_flow.png"
              alt="RythmDanceFlow"
              width={700}
              height={300}
            />
          </div>
        </section>
      </main>
    </>
  );
}
