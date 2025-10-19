"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Contact.module.css";

export default function Contact() {
  const [open, setOpen] = useState([false, false, false]);
  const [subOpen, setSubOpen] = useState([false, false, false]);

  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const subContentRefs = [
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

  // ✅ NOUVEAU — ajustement automatique quand les images se chargent
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
          <h1>Contact & Booking</h1>
          <h2>
            Have questions? Want to join a class or start private training?
          </h2>
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
                  📱 Contact Info
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
                      📱 WhatsApp / Call: +41 77 493 40 18 - 👉 Direct Access
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:rdfbatchatafusion__will@hotmail.com"
                      className={styles.contactLink}
                    >
                      📧 Email: rdfbatchatafusion__will@hotmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/coach_wil_84"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      📸 Instagram: @coach_wil_84
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/people/Wil-Tah/100012235066793/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      📘 Facebook: Wil Bachata
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@rdf_bachata_chanel84"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      🎵 TikTok: @rdf_bachata_chanel84
                    </a>
                  </li>
                  {/* Sous-accordéon Collaboration */}
                  <div className={styles.subAccordion}>
                    <header
                      className={styles.subHeader}
                      onClick={() => toggleSub(2)}
                    >
                      <button
                        className={styles.subToggleBtn}
                        aria-expanded={subOpen[2]}
                        aria-controls="sub-panel-collaboration"
                        aria-label="Toggle Collaboration Partners"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSub(2);
                        }}
                      >
                        <span className={styles.toggleIcon}>
                          {subOpen[2] ? "−" : "+"}
                        </span>
                      </button>
                      <h5 className={styles.subTitle}>🤝 Collaboration</h5>
                    </header>
                    <div
                      id="sub-panel-collaboration"
                      className={`${styles.subContent} ${
                        subOpen[2] ? styles.open : ""
                      }`}
                      ref={subContentRefs[2]}
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
                      </ul>
                    </div>
                  </div>
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
                  🏢 Studio Locations
                </h3>
              </header>
              <div
                id="panel-studio"
                role="region"
                aria-labelledby="studio-title"
                className={styles.cardContent}
                ref={contentRefs[1]}
              >
                <h4>Group Classes — Bachata Lab Saint-Gallen</h4>
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
                  Move Box Studio <br />
                  Unterstrasse 22, 9000 St. Gallen
                </address>
                <ul>
                  <li>✅ Parking available</li>
                  <li>✅ Easy access from Davidstrasse stop</li>
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
                      📸 Photos Move Box Studio
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
                  Private Classes — Coach Wil Studio
                </h4>
                <address
                  className={styles.address}
                  onClick={() =>
                    openGoogleMaps("Wildeggstrasse 16, 9000 St. Gallen")
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span className={styles.mapIcon}>📍</span>
                  Wildeggstrasse 16, 9000 St. Gallen
                </address>
                <ul>
                  <li>📅 Available Tuesday–Friday (13:00–17:00)</li>
                  <li>📅 Saturday (10:00–12:00 / 13:00–18:00)</li>
                  <li>⚠️ By appointment only</li>
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
                      📸 Photos Wildeggstrasse 16
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
                  🤝 Private Coaching
                </h3>
              </header>
              <div
                id="panel-coaching"
                role="region"
                aria-labelledby="coaching-title"
                className={styles.cardContent}
                ref={contentRefs[2]}
              >
                <p>
                  Want faster progress or personal guidance? I offer 1:1 or 2:1
                  private sessions for:
                </p>
                <ul>
                  <li>Foundation & body movement training</li>
                  <li>Lead & follow technique</li>
                  <li>Styling, musicality & flow</li>
                  <li>Wedding dance or performance preparation</li>
                </ul>
                <p>
                  Just send me a message with: <br />
                  <em>&quot;Private class + your availability&quot;</em>
                  <br />
                  and I&apos;ll propose the best options for you.
                </p>
                <p>
                  I look forward to dancing with you soon!
                  <br />
                  Coach Wil
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
