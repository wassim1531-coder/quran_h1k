"use client";

import Link from "next/link";

const adhkar = [
  {
    text: "آية الكرسي: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...",
    count: "مرة واحدة",
    source: "سورة البقرة: 255",
  },
  {
    text: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    count: "3 مرات",
    source: "سورة الإخلاص",
  },
  {
    text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    count: "3 مرات",
    source: "سورة الفلق",
  },
  {
    text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    count: "3 مرات",
    source: "سورة الناس",
  },
  {
    text: "اللهم إني أصبحت أشهدك وأشهد حملة عرشك وملائكتك وجميع خلقك أنك أنت الله لا إله إلا أنت وحدك لا شريك لك وأن محمدًا عبدك ورسولك.",
    count: "4 مرات",
    source: "رواه أبو داود، وحُسِّن إسناده عند عدد من أهل العلم",
  },
  {
    text: "رضيت بالله ربًا، وبالإسلام دينًا، وبمحمد ﷺ نبيًا.",
    count: "3 مرات",
    source: "رواه أبو داود والترمذي",
  },
  {
    text: "حسبي الله لا إله إلا هو، عليه توكلت وهو رب العرش العظيم.",
    count: "7 مرات",
    source: "ورد عن أبي الدرداء رضي الله عنه موقوفًا",
  },
];

export default function MorningAdhkar() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      <div className="mx-auto max-w-4xl">
        <Link href="/adhkar" className="mb-8 inline-block text-emerald-700 dark:text-emerald-400">
          ← الأذكار
        </Link>

        <h1 className="mb-3 text-4xl font-bold">أذكار الصباح</h1>

        <p className="mb-8 leading-8 text-stone-700 dark:text-stone-300">
          أذكار مختارة من القرآن والسنة، مع ذكر المصدر والتنبيه على درجة
          الرواية عند الحاجة.
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
