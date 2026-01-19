// Navbar.tsx de Wil 
"use client";

import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Image from "next/image";
import { FaGlobe } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import styles from "./NavBar.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Extraire la locale actuelle depuis l'URL
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  // Charger les traductions
  const t = getDictionary(currentLocale);

  const closeNav = () => setExpanded(false);

  // Vérifie si on est sur la page d'accueil
  const isHomePage =
    pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;

  // ✅ DÉPLACÉ AVANT LE RETURN CONDITIONNEL
  // Effect pour gérer le scroll après changement de langue
  useEffect(() => {
    // Si on a un hash dans l'URL, scroller vers cette section
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1); // Enlever le #

      // Attendre que la page soit chargée avant de scroller
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 120;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [pathname]); // Se déclenche à chaque changement de route

  // Vérification de sécurité APRÈS les hooks
  if (!t || !t.nav) {
    return null;
  }

  const scrollToSection = (sectionId: string) => {
    closeNav();

    if (!isHomePage) {
      // Si on est sur une autre page, navigue vers la home avec la bonne langue
      router.push(`/${currentLocale}/#${sectionId}`);
    } else {
      // Si on est déjà sur la home, scroll normalement
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToTop = () => {
    closeNav();

    if (!isHomePage) {
      // Si on est sur une autre page, retourne à la home
      router.push(`/${currentLocale}`);
    } else {
      // Si on est déjà sur la home, scroll en haut
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Fonction pour changer de langue en gardant la position et la section
  const changeLanguage = (newLocale: Locale) => {
    closeNav(); // ferme le menu mobile

    // Supprime les classes Bootstrap qui bloquent le scroll
    // document.body.classList.remove("modal-open", "overflow-hidden");
    // document.body.style.overflow = "auto";

    // Si on est déjà sur cette langue, ne rien faire
    if (newLocale === currentLocale) return;

    // Récupère le hash actuel (ex: #contact)
    const currentHash = window.location.hash || "";

    // Récupère le chemin sans la locale actuelle
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";

    // Construit la nouvelle URL
    const newUrl = `/${newLocale}${pathWithoutLocale}${currentHash}`;

    // Sauvegarde la position actuelle du scroll
    const currentScrollY = window.scrollY;

    // Redirige vers la nouvelle langue
    router.push(newUrl);

    // 🧩 Après redirection : attendre que le DOM se mette à jour
    setTimeout(() => {
      // Si on a un hash (#section)
      if (currentHash) {
        const element = document.getElementById(currentHash.substring(1));
        if (element) {
          const navbarHeight = 120; // ajuste selon ta hauteur réelle

          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          return;
        }
      }

      // Sinon, on restaure la position du scroll
      window.scrollTo({
        top: currentScrollY,
        behavior: "instant",
      });
    }, 300); // petit délai pour laisser Next.js mettre à jour la page
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className={styles.navbarCustom}
      fixed="top"
      as="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container fluid className={styles.navbarContainer}>
        {/* Logo */}
        <Navbar.Brand
          onClick={scrollToTop}
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
          aria-label="Wil Bachata Home"
        >
          <Image
            src="/rdf_logo.jpeg"
            alt="Wil Bachata - Professional Bachata Dance Classes in St. Gallen"
            width={90}
            height={90}
            priority
            className={styles.logo}
          />
        </Navbar.Brand>

        {/* Liens principaux dans le collapse */}
        <Navbar.Collapse
          id="main-navbar-nav"
          className={styles.mainNavCollapse}
        >
          <Nav className="d-flex align-items-center" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                onClick={scrollToTop}
                style={{ cursor: "pointer" }}
                aria-label="Go to home section"
              >
                {t.nav.home}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("about")}
                style={{ cursor: "pointer" }}
                aria-label="Learn about Wilfried and his dance experience"
              >
                {t.nav.about}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("danceroom")}
                style={{ cursor: "pointer" }}
                aria-label="Discover our dance studio in St. Gallen"
              >
                {t.nav.membership}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("review")}
                style={{ cursor: "pointer" }}
                aria-label="Review from students"
              >
                {t.nav.review}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("contact")}
                style={{ cursor: "pointer" }}
                aria-label="Contact us for class information"
              >
                {t.nav.contact}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("faq")}
                style={{ cursor: "pointer" }}
                aria-label="FAQ"
              >
                {t.nav.faq}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

        {/* Bloc droit : WhatsApp + langues dropdown + Burger */}
        <div className={styles.rightSection}>
          <a
            href="https://wa.me/41774934018?text=Hello%2C%20I%27m%20interested%20in%20Bachata%20classes"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.whatsappBtn} ${styles.whatsappCustom}`}
            onClick={closeNav}
            aria-label="Contact us on WhatsApp for class inquiries"
            title="WhatsApp: +41 77 493 40 18"
          >
            <i className="bi bi-whatsapp" aria-hidden="true"></i>
          </a>

          {/* Dropdown langues avec icône globe */}
          <Dropdown className={styles.languageDropdown} align="end">
            <Dropdown.Toggle
              variant="link"
              id="language-dropdown"
              className={styles.globeIcon}
              aria-label="Select language"
            >
              <FaGlobe size={24} />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.languageMenu}>
              <Dropdown.Item
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeLanguage("en");
                }}
                hrefLang="en"
                active={currentLocale === "en"}
              >
                🇬🇧 English
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeLanguage("de");
                }}
                hrefLang="de"
                active={currentLocale === "de"}
              >
                🇩🇪 Deutsch
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  changeLanguage("fr");
                }}
                hrefLang="fr"
                active={currentLocale === "fr"}
              >
                🇫🇷 Français
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Burger Toggle */}
          <Navbar.Toggle
            aria-controls="main-navbar-nav"
            aria-label="Toggle navigation menu"
            className={styles.navbarToggler}
          />
        </div>
      </Container>
    </Navbar>
  );
}
