import LegalNotice from "@/components/sections/LegalNotice/LegalNotice";

export const metadata = {
  title: "Impressum | Wil Bachata",
  description: "Rechtliche Informationen und Datenschutz für Wil Bachata",
};

export default function ImpressumPage() {
  return <LegalNotice locale="de" />;
}
