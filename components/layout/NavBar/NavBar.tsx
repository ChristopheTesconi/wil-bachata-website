"use client";

import { useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { FaGlobe } from "react-icons/fa";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className={styles.navbarCustom}
      sticky="top"
      as="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container fluid className={styles.navbarContainer}>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          href="/en"
          onClick={closeNav}
          className="d-flex align-items-center"
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

        {/* Liens principaux dans le collapse - Desktop only */}
        <Navbar.Collapse id="main-navbar-nav" className={styles.mainNavCollapse}>
          <Nav className="d-flex align-items-center" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                href="/en"
                onClick={closeNav}
                aria-label="Go to home page"
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                href="/en/about"
                onClick={closeNav}
                aria-label="Learn about Wilfried and his dance experience"
              >
                About Me
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                href="/en/danceroom"
                onClick={closeNav}
                aria-label="Discover our dance studio in St. Gallen"
              >
                Dance Room
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                as={Link}
                href="/en/contact"
                onClick={closeNav}
                aria-label="Contact us for class information"
              >
                Contact
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
                as={Link}
                href="/en"
                onClick={closeNav}
                hrefLang="en"
              >
                🇬🇧 English
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                href="/de"
                onClick={closeNav}
                hrefLang="de"
              >
                🇩🇪 Deutsch
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                href="/fr"
                onClick={closeNav}
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