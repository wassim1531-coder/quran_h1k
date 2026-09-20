"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Chapter {
  id: number;
  arabic: string;
  english?: string;
}

interface Hadith {
  id: number;
  number: number;
  chapterId: number;
  chapter: string;
  chapterEnglish?: string;
  arabic: string;
  english?: {
    narrator?: string;
    text?: string;
  } | null;
}

interface BookData {
  metadata?: {
    id: number;
    length: number;
    arabic?: {
      title?: string;
      author?: string;
      introduction?: string;
    };
    english?: {
      title?: string;
      author?: string;
    };
  };
  chapters: Chapter[];
  hadiths: Hadith[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const bookTitles: Record<string, { name: string; author: string }> = {
  bukhari: { name: "صحيح البخاري", author: "الإمام محمد بن إسماعيل البخاري" },
  muslim: { name: "صحيح مسلم", author: "الإمام مسلم بن الحجاج" },
  "abu-dawud": { name: "سنن أبي داود", author: "الإمام أبو داود السجستاني" },
  tirmidhi: { name: "سنن الترمذي", author: "الإمام الترمذي" },
  nasai: { name: "سنن النسائي", author: "الإمام النسائي" },
  "ibn-majah": { name: "سنن ابن ماجه", author: "الإمام ابن ماجه" },
  ahmad: { name: "مسند أحمد", author: "الإمام أحمد بن حنبل" },
  darimi: { name: "سنن الدارمي", author: "الإمام الدارمي" },
  malik: { name: "موطأ الإمام مالك", author: "الإمام مالك" },
};

export default function HadithBookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const resolvedParams = use(params);
  const bookKey = resolvedParams.book;
  const fallback = bookTitles[bookKey] || {
    name: "كتاب الحديث",
    author: "",
  };

  const [data, setData] = useState<BookData | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadHadiths() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "30",
        });

        if (query) params.set("q", query);
        if (chapter) params.set("chapter", chapter);

        const response = await fetch(`/api/hadith/${bookKey}?${params}`);

        if (!response.ok) {
          throw new Error("Failed to load hadiths");
        }

        const result = await response.json();

        if (!cancelled) {
          setData(result);
        }
      } catch {
        if (!cancelled) {
          setError("تعذر تحميل الأحاديث. حاول مرة أخرى.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHadiths();

    return () => {
      cancelled = true;
    };
  }, [bookKey, query, chapter, page]);

  const bookInfo = useMemo(
    () => ({
      name:
        data?.metadata?.arabic?.title ||
        fallback.name,
      author:
        data?.metadata?.arabic?.author ||
        fallback.author,
      length:
        data?.metadata?.length || 0,
    }),
    [data, fallback.name, fallback.author]
  );

  function submitSearch() {
    setPage(1);
    setQuery(searchInput.trim());
  }

  function clearSearch() {
    setSearchInput("");
    setQuery("");
    setChapter("");
    setPage(1);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6 px-4" dir="rtl">
      <div className="rounded-3xl bg-white/90 dark:bg-slate-900/85 border border-emerald-200 dark:border-emerald-900/40 p-5 md:p-7 shadow-sm">
        <Link
          href="/hadith"
          className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline inline-block mb-4"
        >
          ← العودة إلى مكتبة الحديث
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
              {bookInfo.name}
            </h1>

            <p className="text-stone-600 dark:text-slate-400 text-sm mt-1">
              {bookInfo.author}
            </p>

            {bookInfo.length > 0 && (
              <p className="text-xs text-stone-500 dark:text-slate-500 mt-3">
                {bookInfo.length.toLocaleString("ar-MA")} حديث
              </p>
            )}
          </div>

          <div className="w-full lg:w-[460px]">
            <div className="flex gap-2">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch();
                }}
                placeholder="ابحث برقم الحديث أو كلمة..."
                className="flex-1 px-4 py-3 rounded-xl bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-slate-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />

              <button
                onClick={submitSearch}
                className="px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium transition"
              >
                بحث
              </button>
            </div>
          </div>
        </div>
      </div>

      {data && (
        <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={chapter}
              onChange={(e) => {
                setChapter(e.target.value);
                setPage(1);
              }}
              className="flex-1 px-4 py-3 rounded-xl bg-stone-100 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="">جميع الأبواب</option>
              {data.chapters.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.arabic}
                </option>
              ))}
            </select>

            {(query || chapter) && (
              <button
                onClick={clearSearch}
                className="px-5 py-3 rounded-xl border border-stone-200 dark:border-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
              >
                مسح الفلاتر
              </button>
            )}
          </div>

          {data.pagination.total > 0 && (
            <p className="text-xs text-stone-500 dark:text-slate-500 mt-3">
              عرض {((data.pagination.page - 1) * data.pagination.limit + 1).toLocaleString("ar-MA")}
              {" - "}
              {Math.min(
                data.pagination.page * data.pagination.limit,
                data.pagination.total
              ).toLocaleString("ar-MA")}
              {" من "}
              {data.pagination.total.toLocaleString("ar-MA")}
            </p>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-5 text-red-700 dark:text-red-300 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-56 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : data?.hadiths.length ? (
        <div className="space-y-4">
          {data.hadiths.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-slate-800 pb-4 mb-4">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    حديث رقم {item.number}
                  </span>

                  <span className="text-xs text-stone-500 dark:text-slate-500">
                    {item.chapter}
                  </span>
                </div>

                {item.english?.narrator && (
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium mb-3">
                    {item.english.narrator}
                  </p>
                )}

                <p className="text-lg md:text-xl text-stone-900 dark:text-slate-100 font-serif leading-[2.1] text-justify whitespace-pre-line">
                  {item.arabic}
                </p>

                {item.english?.text && (
                  <details className="mt-6 pt-4 border-t border-stone-200 dark:border-slate-800">
                    <summary className="cursor-pointer text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                      عرض الترجمة الإنجليزية
                    </summary>
                    <p
                      dir="ltr"
                      className="text-sm md:text-base text-stone-600 dark:text-slate-400 leading-relaxed mt-4 text-left"
                    >
                      {item.english.text}
                    </p>
                  </details>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white/90 dark:bg-slate-900/85 border border-stone-200 dark:border-slate-800 p-10 text-center">
          <p className="text-stone-600 dark:text-slate-400">
            لا توجد أحاديث مطابقة للبحث.
          </p>
        </div>
      )}

      {data && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pb-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 disabled:opacity-40 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
          >
            السابق
          </button>

          <span className="text-sm text-stone-600 dark:text-slate-400">
            {data.pagination.page.toLocaleString("ar-MA")} /{" "}
            {data.pagination.totalPages.toLocaleString("ar-MA")}
          </span>

          <button
            disabled={page >= data.pagination.totalPages}
            onClick={() =>
              setPage((value) =>
                Math.min(data.pagination.totalPages, value + 1)
              )
            }
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-800 disabled:opacity-40 hover:bg-stone-100 dark:hover:bg-slate-800 transition"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
