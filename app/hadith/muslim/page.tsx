"use client";

import Link from "next/link";

const hadiths = [
  {
    number: 1,
    text: "الإسلام أن تشهد أن لا إله إلا الله وأن محمدًا رسول الله، وتقيم الصلاة، وتؤتي الزكاة، وتصوم رمضان، وتحج البيت إن استطعت إليه سبيلًا.",
    source: "صحيح مسلم، كتاب الإيمان، حديث رقم 8",
  },
  {
    number: 2,
    text: "من كان يؤمن بالله واليوم الآخر فليقل خيرًا أو ليصمت.",
    source: "صحيح مسلم، كتاب الإيمان، حديث رقم 47",
  },
  {
    number: 3,
    text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",
    source: "صحيح مسلم، كتاب الإيمان، حديث رقم 45",
  },
];

export default function MuslimPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/hadith" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400">
          ← الأحاديث
        </Link>

        <h1 className="mb-3 text-4xl font-bold">صحيح مسلم</h1>

        <p className="mb-8 leading-8 text-stone-700 dark:text-stone-300">
          أحاديث مختارة من صحيح الإمام مسلم رحمه الله، مع ذكر الكتاب ورقم
          الحديث.
        </p>

        <div className="space-y-6">
          {hadiths.map((hadith) => (
            <article
              key={hadith.number}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-stone-900 shadow-sm transition-colors dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  حديث رقم {hadith.number}
                </span>

                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-sm font-semibold">
                  صحيح
                </span>
              </div>

              <p className="text-xl leading-10">{hadith.text}</p>

              <div className="mt-5 border-t border-stone-200 pt-4 text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400">
                {hadith.source}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30 p-6">
          <p className="leading-8">
            هذا القسم تجريبي حاليًا. قبل إطلاق الموقع سنستبدل البيانات
            التجريبية ببيانات حديث موثقة ومراجعة.
          </p>
        </div>
      </div>
    </main>
  );
}
