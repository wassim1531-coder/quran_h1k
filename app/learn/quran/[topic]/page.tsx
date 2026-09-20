import TajweedTopicPageClient from "./TajweedTopicPageClient";

export function generateStaticParams() {
  return [
    { topic: "noon" },
    { topic: "makharij" },
  ];
}

export default function TajweedTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  return <TajweedTopicPageClient params={params} />;
}