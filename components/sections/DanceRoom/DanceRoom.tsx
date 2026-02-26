// DanceRoom.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./DanceRoom.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function DanceRoom() {
  const [open, setOpen] = useState([false, false, false, false, false, false]); // 6 éléments maintenant
  const contentRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null), // 6ème ref
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

  // Structured Data pour SEO - UPDATED
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bachata Lab Pro Membership",
    description:
      "Bachata Lab Pro Membership offers full dance training, access to RDF Bachata Fusion App, and social dance events.",
    image: "https://bachata-stgallen.ch/rdf_logo.jpeg",
    brand: {
      "@type": "Brand",
      name: "Bachata Lab",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Bachata Lab Pro Student",
        price: "110",
        priceCurrency: "CHF",
        description:
          "4 flexible classes per month + RDF App Laboratorium access for students up to 26 years old",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Bachata Lab Pro Classic",
        price: "150",
        priceCurrency: "CHF",
        description:
          "5 Flexible Classes per month + RDF App + Salsa Ritmo Workshop and Party Pass",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Bachata Lab Pro PartyBanger",
        price: "190",
        priceCurrency: "CHF",
        description:
          "8 Flexible Classes + RDF App + Bachata Step Challenge Part 1 + Multiple Party Passes",
        availability: "https://schema.org/InStock",
        url: "https://bachata-stgallen.ch",
      },
      {
        "@type": "Offer",
        name: "Bachata Lab Pro VIP",
        price: "240",
        priceCurrency: "CHF",
        description:
          "Unlimited Classes + Full RDF App + Multiple Party Passes + Private Coaching",
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
                <p className={styles.description}>
                  {t.danceroom.proStudent.description}
                </p>
                <ul>
                  {t.danceroom.proStudent.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>{t.danceroom.proStudent.price}</p>
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
                <p className={styles.description}>
                  {t.danceroom.proClassic.description}
                </p>
                <ul>
                  {t.danceroom.proClassic.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>{t.danceroom.proClassic.price}</p>
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
                <p className={styles.description}>
                  {t.danceroom.proPartyBanger.description}
                </p>
                <ul>
                  {t.danceroom.proPartyBanger.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>
                  {t.danceroom.proPartyBanger.price}
                </p>
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
                <p className={styles.description}>
                  {t.danceroom.proVIP.description}
                </p>
                <ul>
                  {t.danceroom.proVIP.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className={styles.price}>{t.danceroom.proVIP.price}</p>
              </div>
            </article>

            {/* Good to Know */}
            <article className={styles.card} aria-labelledby="goodtoknow-title">
              <header className={styles.cardHeader} onClick={() => toggle(4)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[4]}
                  aria-controls="panel-goodtoknow"
                  aria-label="Toggle Good to Know"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(4);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[4] ? "−" : "+"}
                  </span>
                </button>
                <h3 id="goodtoknow-title" className={styles.cardTitle}>
                  {t.danceroom.goodToKnow.title}
                </h3>
              </header>
              <div
                id="panel-goodtoknow"
                role="region"
                aria-labelledby="goodtoknow-title"
                className={styles.cardContent}
                ref={contentRefs[4]}
              >
                <ul>
                  {t.danceroom.goodToKnow.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p>
                  <strong>Eventfrog Link:</strong>
                  <br />
                  <a
                    href={t.danceroom.goodToKnow.eventfrogLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.danceroom.goodToKnow.eventfrogLink}
                  </a>
                </p>
              </div>
            </article>

            {/* PRIVATE COACHING - UPDATED */}
            <article
              className={styles.card}
              aria-labelledby="coaching-title"
              id="private-coaching"
            >
              <header className={styles.cardHeader} onClick={() => toggle(5)}>
                <button
                  className={styles.toggleBtn}
                  aria-expanded={open[5]}
                  aria-controls="panel-coaching"
                  aria-label="Toggle Private Coaching"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(5);
                  }}
                >
                  <span className={styles.toggleIcon}>
                    {open[5] ? "−" : "+"}
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
                ref={contentRefs[5]}
              >
                <p>{t.contact.privateCoaching.intro}</p>

                <p>
                  <strong>{t.contact.privateCoaching.availability}</strong>
                </p>
                <ul>
                  {t.contact.privateCoaching.availabilityList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <h4>{t.contact.privateCoaching.whatWeWorkOn.title}</h4>
                <p>{t.contact.privateCoaching.whatWeWorkOn.intro}</p>
                <ul>
                  {t.contact.privateCoaching.whatWeWorkOn.items.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
                <p>
                  <em>{t.contact.privateCoaching.whatWeWorkOn.outro}</em>
                </p>

                {/* Schedule & Availability - NEW */}
                <h4>{t.contact.privateCoaching.schedule.title}</h4>
                <ul>
                  <li>{t.contact.privateCoaching.schedule.tueFri}</li>
                  <li>{t.contact.privateCoaching.schedule.sat}</li>
                  <li>
                    <strong>
                      {t.contact.privateCoaching.schedule.appointment}
                    </strong>
                  </li>
                </ul>

                {/* Pricing Per Hour - UPDATED */}
                <h4>{t.contact.privateCoaching.prices.title}</h4>
                <p>
                  <strong>
                    {t.contact.privateCoaching.prices.nonMembersTitle}
                  </strong>
                </p>
                <ul>
                  <li>{t.contact.privateCoaching.prices.nonMembersSolo}</li>
                  <li>{t.contact.privateCoaching.prices.nonMembersCouple}</li>
                </ul>
                <p>
                  <strong>
                    {t.contact.privateCoaching.prices.membersTitle}
                  </strong>
                </p>
                <ul>
                  <li>{t.contact.privateCoaching.prices.membersSolo}</li>
                  <li>{t.contact.privateCoaching.prices.membersCouple}</li>
                </ul>

                {/* Package of 5 Hours - UPDATED */}
                <h4>{t.contact.privateCoaching.packages.package5Title}</h4>
                <p>
                  <strong>
                    {t.contact.privateCoaching.packages.package5NonMembersTitle}
                  </strong>
                </p>
                <ul>
                  <li>
                    {t.contact.privateCoaching.packages.package5NonMembersSolo}
                  </li>
                  <li>
                    {
                      t.contact.privateCoaching.packages
                        .package5NonMembersCouple
                    }
                  </li>
                </ul>
                <p>
                  <strong>
                    {t.contact.privateCoaching.packages.package5MembersTitle}
                  </strong>
                </p>
                <ul>
                  <li>
                    {t.contact.privateCoaching.packages.package5MembersSolo}
                  </li>
                  <li>
                    {t.contact.privateCoaching.packages.package5MembersCouple}
                  </li>
                </ul>

                {/* Package of 10 Hours - UPDATED */}
                <h4>{t.contact.privateCoaching.packages.package10Title}</h4>
                <p>
                  <strong>
                    {
                      t.contact.privateCoaching.packages
                        .package10NonMembersTitle
                    }
                  </strong>
                </p>
                <ul>
                  <li>
                    {t.contact.privateCoaching.packages.package10NonMembersSolo}
                  </li>
                  <li>
                    {
                      t.contact.privateCoaching.packages
                        .package10NonMembersCouple
                    }
                  </li>
                </ul>
                <p>
                  <strong>
                    {t.contact.privateCoaching.packages.package10MembersTitle}
                  </strong>
                </p>
                <ul>
                  <li>
                    {t.contact.privateCoaching.packages.package10MembersSolo}
                  </li>
                  <li>
                    {t.contact.privateCoaching.packages.package10MembersCouple}
                  </li>
                </ul>

                {/* Transformation Program */}
                <h4>{t.contact.privateCoaching.transformation.title}</h4>
                <p>{t.contact.privateCoaching.transformation.intro}</p>
                <p>
                  <strong>
                    {t.contact.privateCoaching.transformation.includes}
                  </strong>
                </p>
                <ul>
                  {t.contact.privateCoaching.transformation.includesList.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
                <p>{t.contact.privateCoaching.transformation.contact}</p>
                <p>{t.contact.privateCoaching.transformation.videoCall}</p>

                <p>
                  <strong>{t.contact.privateCoaching.closing}</strong>
                </p>
                <p>
                  <strong>{t.contact.privateCoaching.signature}</strong>
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

{
  /* Private Coaching - NEW SECTION */
}
// <article
//   className={styles.card}
//   aria-labelledby="private-coaching-title"
//   id="private-coaching"
// >
//   <header className={styles.cardHeader} onClick={() => toggle(5)}>
//     <button
//       className={styles.toggleBtn}
//       aria-expanded={open[5]}
//       aria-controls="panel-private-coaching"
//       aria-label="Toggle Private Coaching"
//       onClick={(e) => {
//         e.stopPropagation();
//         toggle(5);
//       }}
//     >
//       <span className={styles.toggleIcon}>
//         {open[5] ? "−" : "+"}
//       </span>
//     </button>
//     <h3 id="private-coaching-title" className={styles.cardTitle}>
//       {t.danceroom.privateCoaching.title}
//     </h3>
//   </header>
//   <div
//     id="panel-private-coaching"
//     role="region"
//     aria-labelledby="private-coaching-title"
//     className={styles.cardContent}
//     ref={contentRefs[5]}
//   >
//     <p>{t.danceroom.privateCoaching.intro}</p>

//     {/* Schedule */}
//     <h4>{t.danceroom.privateCoaching.schedule.title}</h4>
//     <ul>
//       <li>{t.danceroom.privateCoaching.schedule.tueFri}</li>
//       <li>{t.danceroom.privateCoaching.schedule.sat}</li>
//       <li>
//         <strong>
//           {t.danceroom.privateCoaching.schedule.appointment}
//         </strong>
//       </li>
//     </ul>

//     {/* Pricing */}
//     <h4>{t.danceroom.privateCoaching.pricing.title}</h4>

//     {/* Per Hour */}
//     <p>
//       <strong>
//         {t.danceroom.privateCoaching.pricing.perHour.title}
//       </strong>
//     </p>
//     <ul>
//       <li>
//         {t.danceroom.privateCoaching.pricing.perHour.nonMembersSolo}
//       </li>
//       <li>
//         {
//           t.danceroom.privateCoaching.pricing.perHour
//             .nonMembersCouple
//         }
//       </li>
//       <li>
//         {t.danceroom.privateCoaching.pricing.perHour.membersSolo}
//       </li>
//       <li>
//         {t.danceroom.privateCoaching.pricing.perHour.membersCouple}
//       </li>
//     </ul>

//     {/* Package 5 */}
//     <p>
//       <strong>
//         {t.danceroom.privateCoaching.pricing.package5.title}
//       </strong>
//     </p>
//     <ul>
//       <li>
//         {
//           t.danceroom.privateCoaching.pricing.package5
//             .nonMembersSolo
//         }
//       </li>
//       <li>
//         {
//           t.danceroom.privateCoaching.pricing.package5
//             .nonMembersCouple
//         }
//       </li>
//       <li>
//         {t.danceroom.privateCoaching.pricing.package5.membersSolo}
//       </li>
//       <li>
//         {t.danceroom.privateCoaching.pricing.package5.membersCouple}
//       </li>
//     </ul>

//     {/* Package 10 */}
//     <p>
//       <strong>
//         {t.danceroom.privateCoaching.pricing.package10.title}
//       </strong>
//     </p>
//     <ul>
//       <li>
//         {
//           t.danceroom.privateCoaching.pricing.package10
//             .nonMembersSolo
//         }
//       </li>
//       <li>
//         {
//           t.danceroom.privateCoaching.pricing.package10
//             .nonMembersCouple
//         }
//       </li>
//       <li>
//         {t.danceroom.privateCoaching.pricing.package10.membersSolo}
//       </li>
//       <li>
//         {
//           t.danceroom.privateCoaching.pricing.package10
//             .membersCouple
//         }
//       </li>
//     </ul>
//   </div>
// </article>
