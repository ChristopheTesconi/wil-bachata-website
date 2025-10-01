'use client';

import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
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
    >
      <Container className="d-flex justify-content-between align-items-center">
        {/* Bloc gauche : Logo + liens principaux */}
        <div className="d-flex align-items-center">
          <Navbar.Brand as={Link} href="/en" onClick={closeNav} className="d-flex align-items-center">
            <Image
              src="/rdf_logo.jpeg"
              alt="Wil Bachata Logo"
              width={90}
              height={90}
              priority
              className={styles.logo}
            />
          </Navbar.Brand>

          {/* Liens principaux dans le collapse */}
          <Navbar.Toggle aria-controls="main-navbar-nav" className="ms-2" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="d-flex align-items-center">
              <Nav.Link as={Link} href="/en" onClick={closeNav}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} href="/en/about" onClick={closeNav}>
                About Me
              </Nav.Link>
              <Nav.Link as={Link} href="/en/danceroom" onClick={closeNav}>
                Dance Room
              </Nav.Link>
              <Nav.Link as={Link} href="/en/contact" onClick={closeNav}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>

        {/* Bloc droit : WhatsApp + langues + réseaux sociaux */}
        <div className="d-flex align-items-center">
          <a
            href="https://wa.me/41774934018"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.whatsappBtn} ${styles.whatsappCustom}`}
            onClick={closeNav}
          >
            <i className="bi bi-whatsapp"></i>
          </a>

          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} href="/en" onClick={closeNav} className={styles.langLink}>
              EN
            </Nav.Link>
            <Nav.Link as={Link} href="/de" onClick={closeNav} className={styles.langLink}>
              DE
            </Nav.Link>
            <Nav.Link as={Link} href="/fr" onClick={closeNav} className={styles.langLink}>
              FR
            </Nav.Link>
          </Nav>

          <a
            href="https://www.facebook.com/people/Wil-Tah/100012235066793/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Facebook"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/coach_wil_84"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://rdf-bachata-fusion.passion.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="App"
          >
            <i className="bi bi-phone"></i>
          </a>
        </div>
      </Container>
    </Navbar>
  );
}
