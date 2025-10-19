"use client";

import styles from "./LegalNotice.module.css";

interface LegalNoticeProps {
  locale?: string;
}

interface ContentTranslation {
  title: string;
  owner: string;
  companyName: string;
  ownerName: string;
  address: string;
  contact: string;
  phone: string;
  email: string;
  website: string;
  liability: string;
  liabilityText: string;
  links: string;
  linksText: string;
  copyright: string;
  copyrightText: string;
  privacy: string;
  privacyText: string;
  footerCopyright: string;
}

export default function LegalNotice({ locale = "en" }: LegalNoticeProps) {
  const content: Record<string, ContentTranslation> = {
    en: {
      title: "Legal Notice",
      owner: "Owner & Responsible Party",
      companyName: "RDF Bachata Fusion",
      ownerName: "Coach Wil / Wilfried Tah",
      address: "Wildeggstrasse 16\n9000 St. Gallen, Switzerland",
      contact: "Contact",
      phone: "Phone",
      email: "Email",
      website: "Website",
      liability: "Liability for Content",
      liabilityText:
        "The contents of this website were created with the greatest possible care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages under general Swiss law.",
      links: "Liability for Links",
      linksText:
        "Our website may contain links to external websites of third parties, over whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of linked pages.",
      copyright: "Copyright",
      copyrightText:
        "All texts, photos, videos, and other content on this website are protected by copyright. Any use outside the limits of copyright law requires prior written consent from the owner.",
      privacy: "Data Protection",
      privacyText:
        "We respect your privacy. Personal data (such as name, address, or email address) is collected only on a voluntary basis whenever possible. This data will not be passed on to third parties without your explicit consent.",
      footerCopyright: "© 2025 RDF Bachata Fusion – All rights reserved.",
    },
    de: {
      title: "Impressum",
      owner: "Inhaber & Verantwortlicher",
      companyName: "RDF Bachata Fusion",
      ownerName: "Coach Wil / Wilfried Tah",
      address: "Wildeggstrasse 16\n9000 St. Gallen, Schweiz",
      contact: "Kontakt",
      phone: "Telefon",
      email: "E-Mail",
      website: "Webseite",
      liability: "Haftung für Inhalte",
      liabilityText:
        "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Wir können jedoch keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der Inhalte übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen schweizerischen Gesetzen verantwortlich.",
      links: "Haftung für Links",
      linksText:
        "Unsere Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte verlinkter Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
      copyright: "Urheberrecht",
      copyrightText:
        "Alle Texte, Fotos, Videos und anderen Inhalte dieser Website sind urheberrechtlich geschützt. Jede Nutzung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des Inhabers.",
      privacy: "Datenschutz",
      privacyText:
        "Wir respektieren Ihre Privatsphäre. Personenbezogene Daten (wie Name, Adresse oder E-Mail) werden nur auf freiwilliger Basis erhoben, sofern möglich. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.",
      footerCopyright: "© 2025 RDF Bachata Fusion – Alle Rechte vorbehalten.",
    },
    fr: {
      title: "Mentions Légales",
      owner: "Propriétaire & Responsable",
      companyName: "RDF Bachata Fusion",
      ownerName: "Coach Wil / Wilfried Tah",
      address: "Wildeggstrasse 16\n9000 St. Gallen, Suisse",
      contact: "Contact",
      phone: "Téléphone",
      email: "E-mail",
      website: "Site web",
      liability: "Responsabilité du contenu",
      liabilityText:
        "Le contenu de ce site web a été créé avec le plus grand soin. Cependant, nous ne pouvons garantir l'exactitude, l'exhaustivité ou l'actualité du contenu. En tant que fournisseur de services, nous sommes responsables de notre propre contenu sur ces pages selon la loi suisse générale.",
      links: "Responsabilité des liens",
      linksText:
        "Notre site web peut contenir des liens vers des sites web externes de tiers, sur le contenu desquels nous n'avons aucune influence. Par conséquent, nous ne pouvons assumer aucune responsabilité pour ces contenus externes. Le fournisseur ou l'exploitant respectif des pages est toujours responsable du contenu des pages liées.",
      copyright: "Droits d'auteur",
      copyrightText:
        "Tous les textes, photos, vidéos et autres contenus de ce site web sont protégés par le droit d'auteur. Toute utilisation au-delà des limites du droit d'auteur nécessite le consentement écrit préalable du propriétaire.",
      privacy: "Protection des données",
      privacyText:
        "Nous respectons votre vie privée. Les données personnelles (telles que nom, adresse ou adresse e-mail) ne sont collectées que sur une base volontaire dans la mesure du possible. Ces données ne seront pas transmises à des tiers sans votre consentement explicite.",
      footerCopyright: "© 2025 RDF Bachata Fusion – Tous droits réservés.",
    },
  };

  const t = content[locale] || content.en;

  return (
    <main id="legal" className={styles.legal}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t.title}</h1>

        {/* Owner Section */}
        <section className={styles.section}>
          <h2>{t.owner}</h2>
          <p>
            <strong>{t.companyName}</strong>
          </p>
          <p>
            <strong>{t.ownerName}</strong>
          </p>
          <p style={{ whiteSpace: "pre-line" }}>{t.address}</p>
        </section>

        {/* Contact Section */}
        <section className={styles.section}>
          <h2>{t.contact}</h2>
          <p>
            📧 {t.email}:{" "}
            <a href="mailto:rdfbatchatafusion__will@hotmail.com">
              rdfbatchatafusion__will@hotmail.com
            </a>
          </p>
          <p>
            📞 {t.phone}:{" "}
            <a
              href="https://wa.me/41774934018"
              target="_blank"
              rel="noopener noreferrer"
            >
              +41 77 493 40 18
            </a>
          </p>
          <p>
            🌐 {t.website}:{" "}
            <a
              href="https://bachata-stgallen.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              bachata-stgallen.ch
            </a>
          </p>
        </section>

        {/* Liability Section */}
        <section className={styles.section}>
          <h2>{t.liability}</h2>
          <p>{t.liabilityText}</p>
        </section>

        {/* Links Section */}
        <section className={styles.section}>
          <h2>{t.links}</h2>
          <p>{t.linksText}</p>
        </section>

        {/* Copyright Section */}
        <section className={styles.section}>
          <h2>{t.copyright}</h2>
          <p>{t.copyrightText}</p>
        </section>

        {/* Privacy Section */}
        <section className={styles.section}>
          <h2>{t.privacy}</h2>
          <p>{t.privacyText}</p>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>{t.footerCopyright}</p>
        </footer>
      </div>
    </main>
  );
}
