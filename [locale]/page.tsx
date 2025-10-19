"use client";

import { useEffect } from "react";
import Home from "@/components/sections/Home/Home";
import CarouselPhoto from "@/components/sections/Carousel/CarouselPhoto";
import About from "@/components/sections/About/About";
import DanceRoom from "@/components/sections/DanceRoom/DanceRoom";
import Review from "@/components/sections/Review/Review";
import Contact from "@/components/sections/Contact/Contact";
import FAQ from "@/components/sections/FAQ/Faq";

export default function Main() {
  useEffect(() => {
    // Gère le scroll vers la section si un hash est présent dans l'URL
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
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
  }, []);

  return (
    <>
      <Home />
      <CarouselPhoto />
      <About />
      <DanceRoom />
      <Review />
      <Contact />
      <FAQ />
    </>
  );
}
