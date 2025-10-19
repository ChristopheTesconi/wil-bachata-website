"use client";

import { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Image from "next/image";
import { FaGlobe } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const closeNav = () => setExpanded(false);

  // Vérifie si on est sur la page d'accueil
  const isHomePage =
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/de" ||
    pathname === "/fr";

  const scrollToSection = (sectionId: string) => {
    closeNav();

    if (!isHomePage) {
      // Si on est sur une autre page (comme legal notice), navigue vers la home
      router.push(`/#${sectionId}`);
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
      router.push("/");
    } else {
      // Si on est déjà sur la home, scroll en haut
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("about")}
                style={{ cursor: "pointer" }}
                aria-label="Learn about Wilfried and his dance experience"
              >
                About Me
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("danceroom")}
                style={{ cursor: "pointer" }}
                aria-label="Discover our dance studio in St. Gallen"
              >
                Membership
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("review")}
                style={{ cursor: "pointer" }}
                aria-label="Review from students"
              >
                Review
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("contact")}
                style={{ cursor: "pointer" }}
                aria-label="Contact us for class information"
              >
                Contact
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => scrollToSection("faq")}
                style={{ cursor: "pointer" }}
                aria-label="FAQ"
              >
                FAQ
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
                  closeNav();
                  // TODO: Changer la langue en anglais
                }}
                hrefLang="en"
              >
                🇬🇧 English
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  closeNav();
                  // TODO: Changer la langue en allemand
                }}
                hrefLang="de"
              >
                🇩🇪 Deutsch
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  closeNav();
                  // TODO: Changer la langue en français
                }}
                hrefLang="fr"
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
