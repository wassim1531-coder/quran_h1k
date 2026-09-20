"use client";

import Link from "next/link";

const hadiths = [
  {
    number: 1,
    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.",
    source: "سنن ابن ماجه",
  },
  {
    number: 2,
    text: "من لا يرحم الناس لا يرحمه الله.",
    source: "سنن ابن ماجه",
  },
  {
    number: 3,
    text: "المسلم من سلم المسلمون من لسانه ويده.",
    source: "سنن ابن ماجه",
  },
];

export default function IbnMajahPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/hadith" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400">
          ← الأحاديث
        </Link>

        <h1 className="mb-3 text-4xl font-bold">سنن ابن ماجه</h1>

        <p className="mb-8 leading-8 text-stone-700 dark:text-stone-300">
          قسم سنن ابن ماجه. البيانات الحالية تجريبية إلى حين التحقق النهائي
          من النصوص والمصادر ودرجات الأحاديث.
        </p>

        <div className="space-y-6">
          {hadiths.map((hadith) => (
            <article
              key={hadith.number}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-900 shadow-sm transition-colors dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
            >
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                حديث رقم {hadith.number}
              </span>

              <p className="mt-4 text-xl leading-10">{hadith.text}</p>

              <div className="mt-5 border-t border-stone-200 pt-4 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
                {hadith.source}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30 p-6">
          <p className="leading-8">
            هذا القسم تجريبي حاليًا، وسيتم اعتماد النصوص والبيانات النهائية
            بعد التحقق من المصادر ودرجات الأحاديث.
          </p>
        </div>
      </div>
    </main>
  );
}
