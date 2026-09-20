import SurahPageClient from "./SurahPageClient";

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, index) => ({
    surah: String(index + 1),
  }));
}

export default function SurahPage() {
  return <SurahPageClient />;
}