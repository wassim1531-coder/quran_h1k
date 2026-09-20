import HadithBookPage from "../[book]/HadithBookPageClient";

export default function MalikHadithPage() {
  return <HadithBookPage params={Promise.resolve({ book: "malik" })} />;
}
