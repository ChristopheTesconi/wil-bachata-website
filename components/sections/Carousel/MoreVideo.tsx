"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getDictionary, type Locale } from "@/lib/i18n";
import styles from "./MoreVideo.module.css";

const videos = [
  {
    src: "/wil_step_box.mp4",
    alt: "Wilfried gives class",
  },
  {
    src: "/wil_lateralstep.mp4",
    alt: "Wilfried gives class",
  },
];

export default function MoreVideo() {
  const [open, setOpen] = useState([false]);
  const contentRefs = [useRef<HTMLDivElement>(null)];
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  // Récupérer la locale actuelle
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  // Charger les traductions
  const t = getDictionary(currentLocale);

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = [...prev];
      next[index] = !next[index];

      // Si on ferme la carte, on arrête la vidéo
      if (!next[index] && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }

      return next;
    });
  };

  useEffect(() => {
    contentRefs.forEach((ref, i) => {
      const el = ref.current;
      if (el) {
        if (open[i]) {
          el.style.maxHeight = "none";
          const height = el.scrollHeight;
          el.style.maxHeight = "0px";
          requestAnimationFrame(() => {
            el.style.maxHeight = height + "px";
          });
        } else {
          el.style.maxHeight = "0px";
        }
      }
    });
  }, [open]);

  // Vérification de sécurité
  if (!t || !t.moreVideo) {
    return null;
  }

  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardsGrid}>
        <article className={styles.card} aria-labelledby="morevideo">
          <header className={styles.cardHeader} onClick={() => toggle(0)}>
            <button
              className={styles.toggleBtn}
              aria-expanded={open[0]}
              aria-controls="panel-morevideo"
              aria-label="Toggle more videos"
              onClick={(e) => {
                e.stopPropagation();
                toggle(0);
              }}
            >
              <span className={styles.toggleIcon}>{open[0] ? "−" : "+"}</span>
            </button>
            <h3 id="morevideo-title" className={styles.cardTitle}>
              {t.moreVideo.title}
            </h3>
          </header>

          <div
            ref={contentRefs[0]}
            className={styles.cardContent}
            id="panel-morevideo"
          >
            <div className={styles.videosContainer}>
              {videos.map((video, index) => (
                <div key={index} className={styles.videoWrapper}>
                  <video controls ref={videoRef} className={styles.video}>
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
