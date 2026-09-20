import AdhkarCategoryPageClient from "./AdhkarCategoryPageClient";

export function generateStaticParams() {
  return [
    { category: "morning" },
    { category: "evening" },
    { category: "after-prayer" },
    { category: "sleep" },
    { category: "home" },
    { category: "travel" },
  ];
}

export default function AdhkarCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return <AdhkarCategoryPageClient params={params} />;
}