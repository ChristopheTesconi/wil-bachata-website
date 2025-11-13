"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Home.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Home() {
  const [open, setOpen] = useState([false, false, false, false, false]); // 5 éléments
  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null), // 5ème ref
  ];
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  // Récupérer la locale actuelle
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  // Charger les traductions
  const t = getDictionary(currentLocale);

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

  if (!t || !t.home) {
    return null;
  }

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
            {t.home.hero.title} <span>{t.home.hero.subtitle}</span>
          </h1>
          <h2>{t.home.hero.tagline}</h2>
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
                  {t.home.weeklyClasses.title}
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
                  <h4>{t.home.weeklyClasses.monday.title}</h4>
                  <p>{t.home.weeklyClasses.monday.description}</p>
                </div>
                <div className={styles.classItem}>
                  <h4>{t.home.weeklyClasses.thursday.title}</h4>
                  <p>
                    <strong>{t.home.weeklyClasses.thursday.part1}</strong>{" "}
                    {t.home.weeklyClasses.thursday.part1desc}
                    <br />
                    <strong>{t.home.weeklyClasses.thursday.part2}</strong>{" "}
                    {t.home.weeklyClasses.thursday.part2desc}
                  </p>
                </div>
                <div className={styles.classItem}>
                  <h4>{t.home.weeklyClasses.friday.title}</h4>
                  <p>{t.home.weeklyClasses.friday.description}</p>
                  <div className={styles.friday}>
                    <p>
                      {t.home.weeklyClasses.friday.special}
                      <br />
                      <em>{t.home.weeklyClasses.friday.styling}</em>{" "}
                      {t.home.weeklyClasses.friday.stylingDesc}
                      <br />
                      <em>{t.home.weeklyClasses.friday.social}</em>{" "}
                      {t.home.weeklyClasses.friday.socialDesc}
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
                  {t.home.prices.title}
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
                    <strong>{t.home.prices.earlyBird}</strong>{" "}
                    {t.home.prices.earlyBirdPrice}
                  </li>
                  <li>
                    <strong>{t.home.prices.atDoor}</strong>{" "}
                    {t.home.prices.atDoorPrice}
                  </li>
                  <li>
                    <strong>{t.home.prices.firstTime}</strong>{" "}
                    {t.home.prices.firstTimePrice}
                  </li>
                </ul>
                <p>
                  {t.home.prices.membership}
                  <br />
                  {t.home.prices.membershipBenefit}
                  <br />
                  {t.home.prices.membershipPrice}
                  <br />
                  {t.home.prices.membershipIncludes}
                </p>
                <p>
                  <em>{t.home.prices.askMe}</em>
                </p>
              </div>
            </article>

            {/* Bookings */}
            <article className={styles.card} aria-labelledby="bookings-title">
              <header className={styles.cardHeader} onClick={() => toggle(4)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[4]}
                  aria-controls="panel-bookings"
                  aria-label="Toggle bookings"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(4);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[4] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="bookings-title" className={styles.cardTitle}>
                  {t.home.bookings.title}
                </h3>
              </header>
              <div
                id="panel-bookings"
                role="region"
                aria-labelledby="bookings-title"
                className={styles.cardContent}
                ref={contentRefs[4]}
              >
                <p>{t.home.bookings.atDoor}</p>
                <p>{t.home.bookings.online}</p>
                <p>
                  <strong>{t.home.bookings.clickLink}</strong>
                </p>
                <a
                  href={t.home.bookings.eventfrogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.eventfrogLink}
                >
                  {t.home.bookings.eventfrogLink}
                </a>
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
                  {t.home.location.title}
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
                  {t.home.location.address.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </address>
                <ul>
                  <li>{t.home.location.feature1}</li>
                  <li>{t.home.location.feature2}</li>
                  <li>{t.home.location.feature3}</li>
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
                  {t.home.video.title}
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
          <h2>{t.home.outro.title}</h2>
          <p>
            {t.home.outro.description.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </p>
          <p>
            <strong>{t.home.outro.cta}</strong>
            <br />
            {t.home.outro.signature}
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
