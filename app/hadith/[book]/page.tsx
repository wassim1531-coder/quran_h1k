import HadithBookPageClient from "./HadithBookPageClient";

export function generateStaticParams() {
  return [
    { book: "bukhari" },
    { book: "muslim" },
    { book: "abu-dawud" },
    { book: "tirmidhi" },
    { book: "nasai" },
    { book: "ibn-majah" },
    { book: "ahmad" },
    { book: "darimi" },
  ];
}

export default function HadithBookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  return <HadithBookPageClient params={params} />;
}