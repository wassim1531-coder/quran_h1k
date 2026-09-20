"use client";

import Link from "next/link";

interface HadithBook {
  id: string;
  name: string;
  author: string;
  desc: string;
  icon: string;
}

const books: HadithBook[] = [
  {
    id: "bukhari",
    name: "صحيح البخاري",
    author: "الإمام محمد بن إسماعيل البخاري",
    desc: "من كتب الحديث المشهورة، مرتب على أبواب متعددة في السنة والفقه.",
    icon: "📚",
  },
  {
    id: "muslim",
    name: "صحيح مسلم",
    author: "الإمام مسلم بن الحجاج",
    desc: "كتاب حديث مرتب على الكتب والأبواب، ويضم أحاديث كثيرة في السنة.",
    icon: "📖",
  },
  {
    id: "abu-dawud",
    name: "سنن أبي داود",
    author: "الإمام أبو داود السجستاني",
    desc: "من كتب السنن، ويشتمل على أحاديث مرتبة في أبواب الأحكام وغيرها.",
    icon: "📜",
  },
  {
    id: "tirmidhi",
    name: "سنن الترمذي",
    author: "الإمام الترمذي",
    desc: "من كتب السنن، مرتب على أبواب الفقه والحديث.",
    icon: "📘",
  },
  {
    id: "nasai",
    name: "سنن النسائي",
    author: "الإمام النسائي",
    desc: "كتاب من كتب السنن، مرتب على أبواب الحديث والفقه.",
    icon: "📗",
  },
  {
    id: "ibn-majah",
    name: "سنن ابن ماجه",
    author: "الإمام ابن ماجه",
    desc: "كتاب من كتب السنن، مرتب على أبواب متعددة من السنة.",
    icon: "📙",
  },
  {
    id: "ahmad",
    name: "مسند أحمد",
    author: "الإمام أحمد بن حنبل",
    desc: "مسند حديثي مرتب على أسماء الصحابة الرواة.",
    icon: "🏛️",
  },
  {
    id: "darimi",
    name: "سنن الدارمي",
    author: "الإمام عبد الله الدارمي",
    desc: "كتاب حديث مرتب على أبواب السنة والفقه.",
    icon: "🔖",
  },
  {
    id: "malik",
    name: "موطأ الإمام مالك",
    author: "الإمام مالك بن أنس",
    desc: "من كتب الحديث والآثار، مرتب على أبواب العلم والفقه.",
    icon: "📜",
  },
];

export default function HadithIndexPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 py-6 px-4" dir="rtl">
      <div className="bg-white/90 dark:bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-emerald-200 dark:border-emerald-900/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
              مكتبة الحديث النبوي
            </h1>
            <p className="text-stone-600 dark:text-slate-400 text-sm mt-2">
              تصفح مجموعة من دواوين السنة والحديث مع البحث داخل كل كتاب.
            </p>
          </div>

          <div className="text-xs text-stone-500 dark:text-slate-500">
            {books.length} كتب
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/hadith/${book.id}`}
            className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="text-3xl mb-4">{book.icon}</div>

              <h2 className="text-xl font-bold text-stone-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                {book.name}
              </h2>

              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400/90 mt-1 mb-3">
                {book.author}
              </p>

              <p className="text-stone-600 dark:text-slate-400 text-sm leading-relaxed">
                {book.desc}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-400 font-medium group-hover:translate-x-[-4px] transition-transform">
              تصفح الكتاب ←
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
