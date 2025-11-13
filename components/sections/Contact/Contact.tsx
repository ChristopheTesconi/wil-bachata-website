"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Contact.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Contact() {
  const [open, setOpen] = useState([false, false, false, false]);
  const [subOpen, setSubOpen] = useState([false, false]);

  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const subContentRefs = [
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

  const toggleSub = (index: number) => {
    setSubOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const updateHeight = (element: HTMLDivElement | null, isOpen: boolean) => {
    if (!element) return;
    if (isOpen) {
      element.style.maxHeight = `${element.scrollHeight}px`;
    } else {
      element.style.maxHeight = "0px";
    }
  };

  useEffect(() => {
    subContentRefs.forEach((ref, i) => {
      updateHeight(ref.current, subOpen[i]);
    });

    const parentTimer = setTimeout(() => {
      contentRefs.forEach((ref, i) => {
        if (open[i] && ref.current) {
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`;
        }
      });
    }, 100);

    return () => clearTimeout(parentTimer);
  }, [subOpen, open]);

  useEffect(() => {
    contentRefs.forEach((ref, i) => {
      updateHeight(ref.current, open[i]);
    });
  }, [open]);

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    contentRefs.forEach((ref, i) => {
      if (ref.current && open[i]) {
        const observer = new ResizeObserver(() => {
          if (ref.current && open[i]) {
            ref.current.style.maxHeight = `${ref.current.scrollHeight}px`;
          }
        });
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [open, subOpen]);

  useEffect(() => {
    const imageObservers: ResizeObserver[] = [];

    subContentRefs.forEach((ref, i) => {
      if (ref.current) {
        const images = ref.current.querySelectorAll("img");

        images.forEach((img) => {
          const observer = new ResizeObserver(() => {
            if (subOpen[i] && ref.current) {
              ref.current.style.maxHeight = `${ref.current.scrollHeight}px`;
            }
          });
          observer.observe(img);
          imageObservers.push(observer);
        });
      }
    });

    return () => {
      imageObservers.forEach((observer) => observer.disconnect());
    };
  }, [subOpen]);

  const openGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  if (!t || !t.contact) {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RDF Bachata Fusion",
    url: "https://bachata-stgallen.ch",
    logo: "https://bachata-stgallen.ch/rdf_logo.jpeg",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+41 77 493 40 18",
        contactType: "customer support",
        availableLanguage: ["en", "de", "fr"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/coach_wil_84",
      "https://www.facebook.com/people/Wil-Tah/100012235066793/",
      "https://www.youtube.com/@RDF_Wil",
      "https://www.linkedin.com/in/wilfried-tah-54913a273/",
      "https://www.tiktok.com/@rdf_bachata_chanel84",
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
      <main id="contact" className={`container-fluid ${styles.contact}`}>
        <section className={styles.hero}>
          <h1>{t.contact.hero.title}</h1>
          <h2>{t.contact.hero.subtitle}</h2>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.cardsGrid}>
            {/* CONTACT INFO */}
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
                  {t.contact.contactInfo.title}
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
                    <a
                      href="https://wa.me/41774934018?text=Hello%2C%20I%27m%20interested%20in%20Bachata%20classes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      {t.contact.contactInfo.whatsapp}
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:Rdfbachatafusion_wil@hotmail.com"
                      className={styles.contactLink}
                    >
                      {t.contact.contactInfo.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/coach_wil_84"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      {t.contact.contactInfo.instagram}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/people/Wil-Tah/100012235066793/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      {t.contact.contactInfo.facebook}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@rdf_bachata_chanel84"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      {t.contact.contactInfo.tiktok}
                    </a>
                  </li>
                </ul>
              </div>
            </article>

            {/* STUDIO LOCATIONS */}
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
                  {t.contact.studioLocations.title}
                </h3>
              </header>
              <div
                id="panel-studio"
                role="region"
                aria-labelledby="studio-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <h4>{t.contact.studioLocations.groupClasses}</h4>
                <address
                  className={styles.address}
                  onClick={() =>
                    openGoogleMaps(
                      "MoveBox Studio, Unterstrasse 22, 9000 St. Gallen"
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span className={styles.mapIcon}>📍</span>
                  {t.contact.studioLocations.moveBoxAddress
                    .split("\n")
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                </address>
                <ul>
                  <li>{t.contact.studioLocations.parkingAvailable}</li>
                  <li>{t.contact.studioLocations.easyAccess}</li>
                </ul>

                {/* Sous-accordéon 1 */}
                <div className={styles.subAccordion}>
                  <header
                    className={styles.subHeader}
                    onClick={() => toggleSub(0)}
                  >
                    <button
                      className={styles.subToggleBtn}
                      aria-expanded={subOpen[0]}
                      aria-controls="sub-panel-movebox"
                      aria-label="Toggle Move Box Photos"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSub(0);
                      }}
                    >
                      <span className={styles.toggleIcon}>
                        {subOpen[0] ? "−" : "+"}
                      </span>
                    </button>
                    <h5 className={styles.subTitle}>
                      {t.contact.studioLocations.photosMovebox}
                    </h5>
                  </header>
                  <div
                    id="sub-panel-movebox"
                    className={`${styles.subContent} ${
                      subOpen[0] ? styles.open : ""
                    }`}
                    ref={subContentRefs[0]}
                  >
                    <div className={styles.photoGrid}>
                      <div className={styles.photoWrapper}>
                        <Image
                          src="/studio1.jpg"
                          alt="Move Box Studio - View 1"
                          width={400}
                          height={300}
                          className={styles.photo}
                        />
                      </div>
                      <div className={styles.photoWrapper}>
                        <Image
                          src="/studio2.jpg"
                          alt="Move Box Studio - View 2"
                          width={400}
                          height={300}
                          className={styles.photo}
                        />
                      </div>
                      <div className={styles.photoWrapper}>
                        <Image
                          src="/studio3.jpg"
                          alt="Move Box Studio - View 3"
                          width={400}
                          height={300}
                          className={styles.photo}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <h4 style={{ marginTop: "2rem" }}>
                  {t.contact.studioLocations.privateClasses}
                </h4>
                <address
                  className={styles.address}
                  onClick={() =>
                    openGoogleMaps("Wildeggstrasse 16, 9000 St. Gallen")
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span className={styles.mapIcon}>📍</span>
                  {t.contact.studioLocations.wildeggAddress}
                </address>
                <ul>
                  <li>{t.contact.studioLocations.availableTueFri}</li>
                  <li>{t.contact.studioLocations.availableSat}</li>
                  <li>{t.contact.studioLocations.byAppointment}</li>
                </ul>

                {/* Sous-accordéon 2 */}
                <div className={styles.subAccordion}>
                  <header
                    className={styles.subHeader}
                    onClick={() => toggleSub(1)}
                  >
                    <button
                      className={styles.subToggleBtn}
                      aria-expanded={subOpen[1]}
                      aria-controls="sub-panel-wildegg"
                      aria-label="Toggle Wildeggstrasse Photos"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSub(1);
                      }}
                    >
                      <span className={styles.toggleIcon}>
                        {subOpen[1] ? "−" : "+"}
                      </span>
                    </button>
                    <h5 className={styles.subTitle}>
                      {t.contact.studioLocations.photosWildegg}
                    </h5>
                  </header>
                  <div
                    id="sub-panel-wildegg"
                    className={`${styles.subContent} ${
                      subOpen[1] ? styles.open : ""
                    }`}
                    ref={subContentRefs[1]}
                  >
                    <div className={styles.photoGrid}>
                      <div className={styles.photoWrapper}>
                        <Image
                          src="/wil_home1.jpg"
                          alt="Wildeggstrasse Studio - View 1"
                          width={400}
                          height={400}
                          className={styles.photo}
                        />
                      </div>
                      <div className={styles.photoWrapper}>
                        <Image
                          src="/wil_home2.jpg"
                          alt="Wildeggstrasse Studio - View 2"
                          width={400}
                          height={400}
                          className={styles.photo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* PRIVATE COACHING */}
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
                  {t.contact.privateCoaching.title}
                </h3>
              </header>
              <div
                id="panel-coaching"
                role="region"
                aria-labelledby="coaching-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <p>{t.contact.privateCoaching.intro}</p>
                <ul>
                  <li>{t.contact.privateCoaching.item1}</li>
                  <li>{t.contact.privateCoaching.item2}</li>
                  <li>{t.contact.privateCoaching.item3}</li>
                  <li>{t.contact.privateCoaching.item4}</li>
                </ul>
                <p>
                  {t.contact.privateCoaching.sendMessage} <br />
                  <em>
                    &quot;{t.contact.privateCoaching.messageTemplate}&quot;
                  </em>
                  <br />
                  {t.contact.privateCoaching.proposeOptions}
                </p>
                <p>
                  {t.contact.privateCoaching.lookForward}
                  <br />
                  {t.contact.privateCoaching.signature}
                </p>
              </div>
            </article>

            {/* COLLABORATORS */}
            <article
              id="collaborators"
              className={styles.card}
              aria-labelledby="collaborators-title"
            >
              <header className={styles.cardHeader} onClick={() => toggle(3)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[3]}
                  aria-controls="panel-collaborators"
                  aria-label="Toggle Collaborators"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(3);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[3] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="collaborators-title" className={styles.cardTitle}>
                  {t.contact.contactInfo.collaborationTitle}
                </h3>
              </header>
              <div
                id="panel-collaborators"
                role="region"
                aria-labelledby="collaborators-title"
                className={styles.cardContent}
                ref={contentRefs[3]}
              >
                <ul className={styles.collaborationList}>
                  <li>
                    <a
                      href="https://sandraburdet.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      🌟 <strong>Sandra Burdet</strong> 👉
                      https://sandraburdet.com/
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://christophetesconidev.com/en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      💻 <strong>Chris Tesconi</strong> 👉
                      https://christophetesconidev.com/en
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/domingolatinosg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      🎉 <strong>Domingo Latino</strong> 👉
                      https://www.instagram.com/domingolatinosg
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/gartnerdjgalante"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      🎵 <strong>DJ Galante Salsaritmo</strong> 👉
                      https://www.instagram.com/gartnerdjgalante
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/bachata.loca.events?igsh=MXZueW9jZzJnaWZxdQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      🐸 <strong>Bachata Loca Event</strong> 👉
                      https://www.instagram.com/bachata.loca.events
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
