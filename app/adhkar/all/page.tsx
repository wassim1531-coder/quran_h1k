import AdhkarCategoryPage from "../[category]/AdhkarCategoryPageClient";

export default function AllAdhkarPage() {
  return <AdhkarCategoryPage params={Promise.resolve({ category: "all" })} />;
}
