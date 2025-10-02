"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CarouselPhoto.module.css";

const images = [
  { src: "/wil_class.jpg", alt: "Wilfried teaching Bachata class" },
  { src: "/wil_sandra1.jpg", alt: "Wilfried and Sandra dancing Bachata" },
  { src: "/wil_sandra2.jpg", alt: "Wilfried and Sandra performance" },
  { src: "/wil_sandra3.jpg", alt: "Wilfried and Sandra Bachata duo" },
  { src: "/wil_sandra4.mp4", alt: "Wilfried and Sandra dancing" },
];

export default function CarouselPhoto() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.carouselContainer}>
        <button
          onClick={goToPrevious}
          className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
          aria-label="Previous image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className={styles.carouselImageWrapper}>
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className={styles.carouselImage}
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        <button
          onClick={goToNext}
          className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
          aria-label="Next image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className={styles.carouselIndicators}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.indicatorActive : ""
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}