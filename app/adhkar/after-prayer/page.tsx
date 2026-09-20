"use client";

import Link from "next/link";

const adhkar = [
  {
    text: "أستغفر الله",
    count: "3 مرات",
    source: "رواه مسلم",
  },
  {
    text: "اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام.",
    count: "مرة واحدة",
    source: "رواه مسلم",
  },
  {
    text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. اللهم لا مانع لما أعطيت، ولا معطي لما منعت، ولا ينفع ذا الجد منك الجد.",
    count: "مرة واحدة",
    source: "رواه البخاري ومسلم",
  },
  {
    text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
    count: "10 مرات",
    source: "ورد في الذكر بعد الصلاة بألفاظ وروايات متعددة",
  },
  {
    text: "سبحان الله",
    count: "33 مرة",
    source: "رواه مسلم",
  },
  {
    text: "الحمد لله",
    count: "33 مرة",
    source: "رواه مسلم",
  },
  {
    text: "الله أكبر",
    count: "33 مرة",
    source: "رواه مسلم",
  },
  {
    text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
    count: "مرة واحدة بعد التسبيح والتحميد والتكبير",
    source: "رواه مسلم",
  },
  {
    text: "قراءة آية الكرسي: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
    count: "مرة واحدة",
    source: "سورة البقرة: 255",
  },
];

export default function AfterPrayerAdhkar() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/adhkar" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400">
          ← الأذكار
        </Link>

        <h1 className="mb-3 text-4xl font-bold">أذكار بعد الصلاة</h1>

        <p className="mb-8 leading-8 text-stone-700 dark:text-stone-300">
          أذكار مأثورة تقال بعد الصلوات المفروضة، مع بيان المصدر والعدد.
        </p>

        <div className="space-y-5">
          {adhkar.map((dhikr, index) => (
            <article
              key={index}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-900 shadow-sm transition-colors dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  الذكر {index + 1}
                </span>

                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-sm font-semibold">
                  {dhikr.count}
                </span>
              </div>

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
