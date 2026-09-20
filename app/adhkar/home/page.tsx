"use client";

import Link from "next/link";

const adhkar = [
  {
    title: "عند دخول المنزل",
    text: "بسم الله ولجنا، وبسم الله خرجنا، وعلى ربنا توكلنا.",
    source: "رواه أبو داود",
  },
  {
    title: "عند دخول المنزل",
    text: "السلام عليكم ورحمة الله وبركاته.",
    source: "ورد في السنة عند دخول البيت والسلام على أهله",
  },
  {
    title: "عند الخروج من المنزل",
    text: "بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله.",
    source: "رواه أبو داود والترمذي",
  },
  {
    title: "عند الخروج من المنزل",
    text: "اللهم إني أعوذ بك أن أضل أو أُضل، أو أزل أو أُزل، أو أظلم أو أُظلم، أو أجهل أو يُجهل علي.",
    source: "رواه أبو داود والترمذي والنسائي",
  },
];

export default function HomeAdhkar() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/adhkar" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400">
          ← الأذكار
        </Link>

        <h1 className="mb-3 text-4xl font-bold">
          أذكار دخول المنزل والخروج منه
        </h1>

        <p className="mb-8 leading-8 text-stone-700 dark:text-stone-300">
          أذكار وأدعية وردت في السنة عند دخول المنزل والخروج منه.
        </p>

        <div className="space-y-5">
          {adhkar.map((dhikr, index) => (
            <article
              key={index}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-900 shadow-sm transition-colors dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
            >
              <span className="mb-4 inline-block rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                {dhikr.title}
              </span>

              <p className="text-xl leading-10">{dhikr.text}</p>

              <div className="mt-5 border-t border-stone-200 pt-4 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
                المصدر: {dhikr.source}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
