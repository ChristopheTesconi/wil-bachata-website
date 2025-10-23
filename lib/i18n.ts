import en from "@/locales/en.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";

// Type pour les traductions
export type Locale = "en" | "de" | "fr";

// Dictionnaire de toutes les traductions
const dictionaries = {
  en,
  de,
  fr,
};

// Fonction pour obtenir les traductions d'une langue
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

// Type des traductions (pour TypeScript)
export type Dictionary = typeof en;
