"use client";

import Link from "next/link";

const hadiths = [
  {
    number: 1,
    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه.",
    source: "صحيح البخاري، كتاب بدء الوحي، حديث رقم 1",
  },
  {
    number: 2,
    text: "بني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمدًا رسول الله، وإقام الصلاة، وإيتاء الزكاة، والحج، وصوم رمضان.",
    source: "صحيح البخاري، كتاب الإيمان، حديث رقم 8",
  },
  {
    number: 3,
    text: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه.",
    source: "صحيح البخاري، كتاب الإيمان، حديث رقم 10",
  },
];

export default function BukhariPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/hadith" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400 transition-colors">
          ← الأحاديث
        </Link>

        <h1 className="mb-3 text-4xl font-bold">صحيح البخاري</h1>

        <p className="mb-8 leading-8 text-stone-600 dark:text-stone-400">
          أحاديث مختارة من صحيح الإمام البخاري رحمه الله، مع ذكر الكتاب ورقم
          الحديث.
        </p>

        <div className="space-y-6">
          {hadiths.map((hadith) => (
            <article
              key={hadith.number}
              className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 shadow-sm transition-colors"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  حديث رقم {hadith.number}
                </span>

                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
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

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30 p-6 text-stone-800 dark:text-stone-200">
          <p className="leading-8">
            هذا القسم تجريبي حاليًا. قبل إطلاق الموقع سنستبدل البيانات
            التجريبية ببيانات حديث موثقة ومراجعة.
          </p>
        </div>
      </div>
    </main>
  );
}
