"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6">
      <div className="rounded-2xl border border-emerald-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-emerald-900/30 dark:bg-slate-900/80">
        <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 md:text-3xl">
          البحث الشامل
        </h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-slate-400">
          ابحث في القرآن الكريم، الأحاديث النبوية، والأذكار.
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="اكتب كلمة البحث هنا..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-stone-300 bg-white px-5 py-4 text-base text-stone-900 shadow-sm transition-colors placeholder:text-stone-500 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
      </div>

      {query ? (
        <div className="rounded-2xl border border-stone-200 bg-white/90 p-6 text-center text-stone-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          جاري البحث عن{" "}
          <span className="font-bold text-emerald-700 dark:text-emerald-400">
            &quot;{query}&quot;
          </span>
          ...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <Link
            href="/quran"
            className="rounded-xl border border-stone-200 bg-white/90 p-4 text-sm text-stone-700 shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:bg-slate-800"
          >
            📖 البحث في القرآن
          </Link>

          <Link
            href="/hadith"
            className="rounded-xl border border-stone-200 bg-white/90 p-4 text-sm text-stone-700 shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:bg-slate-800"
          >
            📜 البحث في الأحاديث
          </Link>

          <Link
            href="/adhkar"
            className="rounded-xl border border-stone-200 bg-white/90 p-4 text-sm text-stone-700 shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:bg-slate-800"
          >
            🤲 البحث في الأذكار
          </Link>
        </div>
      )}
    </div>
  );
}
