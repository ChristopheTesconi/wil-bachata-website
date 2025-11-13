"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import styles from "./MorePhoto.module.css";

const images = [
  { src: "/class1.jpg", alt: "Wilfried teaching Bachata class" },
  { src: "/class2.jpg", alt: "Wilfried teaching Bachata class" },
  { src: "/wil_sandra4.jpg", alt: "Wilfried and Sandra dancing Bachata" },
  { src: "/wil_sandra5.jpg", alt: "Wilfried and Sandra performance" },
  { src: "/wil_sandra6.jpg", alt: "Wilfried and Sandra Bachata Geneva" },
  { src: "/wil_sandra7.jpg", alt: "Wilfried and Sandra performance" },
  { src: "/wil_sandra8.jpg", alt: "Wilfried and Sandra performance" },
  { src: "/wil1.jpg", alt: "Wilfried" },
  { src: "/wil2.jpg", alt: "Wilfried" },
  { src: "/wil3.jpg", alt: "Wilfried" },
  { src: "/wil4.jpg", alt: "Wilfried" },
];

export default function MorePhoto() {
  const [open, setOpen] = useState([false]);
  const contentRefs = [useRef<HTMLDivElement>(null)];
  const [imagesLoaded, setImagesLoaded] = useState(0);
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

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // Recalculer la hauteur quand les images se chargent ou quand open change
  useEffect(() => {
    const updateHeight = () => {
      contentRefs.forEach((ref, i) => {
        const el = ref.current;
        if (el) {
          if (open[i]) {
            // Force le recalcul de la hauteur
            el.style.maxHeight = "none";
            const height = el.scrollHeight;
            el.style.maxHeight = "0px";
            // Petit délai pour forcer le reflow
            requestAnimationFrame(() => {
              el.style.maxHeight = height + "px";
            });
          } else {
            el.style.maxHeight = "0px";
          }
        }
      });
    };

    updateHeight();
  }, [open, imagesLoaded]);

  // Vérification de sécurité
  if (!t || !t.morePhoto) {
    return null;
  }

  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        <article className={styles.card} aria-labelledby="morephoto">
          <header className={styles.cardHeader} onClick={() => toggle(0)}>
            <button
              className={styles.toggleBtn}
              aria-expanded={open[0]}
              aria-controls="panel-morephoto"
              aria-label="Toggle more photos"
              onClick={(e) => {
                e.stopPropagation();
                toggle(0);
              }}
            >
              <span className={styles.toggleIcon}>{open[0] ? "−" : "+"}</span>
            </button>
            <h3 id="morephoto-title" className={styles.cardTitle}>
              {t.morePhoto.title}
            </h3>
          </header>

          <div
            ref={contentRefs[0]}
            className={styles.cardContent}
            id="panel-morephoto"
          >
            <div className={styles.photosContainer}>
              {images.map((image, index) => (
                <div key={index} className={styles.photoWrapper}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    className={styles.photo}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    onLoad={handleImageLoad}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
