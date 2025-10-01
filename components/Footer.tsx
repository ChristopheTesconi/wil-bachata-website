"use client";

import styles from "./Footer.module.css";

export default function Footer({ currentLocale = "en" }) {
  const year = new Date().getFullYear();

  const texts = {
    contact: "Contact",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    legal: "Mentions légales",
    copyright: `© ${year} Wil Bachata. Tous droits réservés.`,
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a
          href="https://wa.me/41774934018"
          target="_blank"
          rel="noopener noreferrer"
        >
          {texts.whatsapp}
        </a>
        <a
          href="https://www.instagram.com/coach_wil_84"
          target="_blank"
          rel="noopener noreferrer"
        >
          {texts.instagram}
        </a>
        <a
          href="https://www.facebook.com/people/Wil-Tah/100012235066793/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {texts.facebook}
        </a>
        <a href={`/${currentLocale}/contact`}>{texts.contact}</a>
      </div>
      <p>
        {texts.copyright}{" "}
        <a className="nav-link" href={`/${currentLocale}/mentions-legales`}>
          {texts.legal}
        </a>
      </p>
    </footer>
  );
}
