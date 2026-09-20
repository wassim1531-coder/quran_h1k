"use client";

import Link from "next/link";

const adhkar = [
  {
    text: "باسمك اللهم أموت وأحيا.",
    count: "مرة واحدة",
    source: "رواه البخاري",
  },
  {
    text: "اللهم أسلمت نفسي إليك، ووجهت وجهي إليك، وفوضت أمري إليك، وألجأت ظهري إليك، رغبة ورهبة إليك، لا ملجأ ولا منجا منك إلا إليك، آمنت بكتابك الذي أنزلت، وبنبيك الذي أرسلت.",
    count: "مرة واحدة",
    source: "رواه البخاري ومسلم",
  },
  {
    text: "قراءة آية الكرسي: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
    count: "مرة واحدة",
    source: "سورة البقرة: 255",
  },
  {
    text: "قراءة سورة الإخلاص وسورة الفلق وسورة الناس، ثم النفث في الكفين ومسح ما استطاع من الجسد.",
    count: "3 مرات",
    source: "رواه البخاري",
  },
  {
    text: "قراءة آخر آيتين من سورة البقرة: آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ...",
    count: "مرة واحدة",
    source: "رواه البخاري ومسلم",
  },
  {
    text: "سبحان الله",
    count: "33 مرة",
    source: "رواه البخاري ومسلم",
  },
  {
    text: "الحمد لله",
    count: "33 مرة",
    source: "رواه البخاري ومسلم",
  },
  {
    text: "الله أكبر",
    count: "34 مرة",
    source: "رواه البخاري ومسلم",
  },
];

export default function SleepAdhkar() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/adhkar" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400">
          ← الأذكار
        </Link>

        <h1 className="mb-3 text-4xl font-bold">أذكار النوم</h1>

        <p className="mb-8 leading-8 text-stone-700 dark:text-stone-300">
          أذكار ثابتة وردت عن النبي ﷺ تُقال عند النوم.
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
