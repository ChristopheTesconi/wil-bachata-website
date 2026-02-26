"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Review.module.css";
import { getDictionary, type Locale } from "@/lib/i18n";

const images = [
  { src: "/review1.png", alt: "review whatsapp" },
  { src: "/review2.jpg", alt: "review whatsapp" },
  { src: "/review3.jpg", alt: "review whatsapp" },
  { src: "/review4.png", alt: "review whatsapp" },
  { src: "/review5.jpg", alt: "review whatsapp" },
  { src: "/review6.png", alt: "review whatsapp" },
  { src: "/review7.jpg", alt: "review whatsapp" },
  { src: "/review8.jpg", alt: "review whatsapp" },
];

export default function CarouselReview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Récupérer la locale actuelle
  const currentLocale = (pathname.split("/")[1] || "en") as Locale;

  // Charger les traductions
  const t = getDictionary(currentLocale);

  useEffect(() => {
    if (isPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    intervalRef.current = setInterval(() => {
      const imageWidth = window.innerWidth > 768 ? 300 : 200;
      const gap = window.innerWidth > 768 ? 32 : 16;
      const scrollAmount = imageWidth + gap;

      const maxScroll = scrollContainer.scrollWidth / 3;

      if (scrollContainer.scrollLeft >= maxScroll - scrollAmount) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  // Vérification de sécurité APRÈS tous les hooks
  if (!t || !t.review) {
    return null;
  }

  const triplicatedImages = [...images, ...images, ...images];

  return (
    <section id="review" className={styles.reviewSection}>
      <h1>{t.review.title}</h1>
      <div className={styles.reviewContainer}>
        <div
          ref={scrollRef}
          className={styles.reviewScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {triplicatedImages.map((image, index) => (
            <div key={index} className={styles.reviewItem}>
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={400}
                className={styles.reviewImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
