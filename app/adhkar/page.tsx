"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface HisnSection {
  Adhkar?: {
    Text: string;
    Count: number;
    Reference: string;
  }[];
}

interface HisnData {
  [key: string]: HisnSection;
}

const featuredCategories = [
  {
    key: "morning",
    title: "أذكار الصباح",
    description: "حصن المسلم في بداية يومك",
    icon: "☀️",
  },
  {
    key: "evening",
    title: "أذكار المساء",
    description: "أذكار المساء والتحصين",
    icon: "🌙",
  },
  {
    key: "sleep",
    title: "أذكار النوم",
    description: "أذكار النوم والاستيقاظ",
    icon: "🛏️",
  },
  {
    key: "after-prayer",
    title: "بعد الصلاة",
    description: "الأذكار الواردة بعد الصلاة",
    icon: "🕌",
  },
  {
    key: "travel",
    title: "أذكار السفر",
    description: "أذكار السفر والركوب",
    icon: "✈️",
  },
  {
    key: "home",
    title: "أذكار المنزل",
    description: "أذكار الدخول والخروج والمنزل",
    icon: "🏠",
  },
];

function normalize(text: string) {
  return text
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .trim();
}

function getCategoryMatch(title: string, key: string) {
  const t = normalize(title);

  switch (key) {
    case "morning":
      return /الصباح|الصبح/.test(t);

    case "evening":
      return /المساء/.test(t);

    case "sleep":
      return /النوم|الاستيقاظ/.test(t);

    case "after-prayer":
      return /بعد.*الصلاه|بعد.*الصلاة/.test(t);

    case "travel":
      return /السفر|الركوب/.test(t);

    case "home":
      return /المنزل|البيت/.test(t);

    default:
      return false;
  }
}

export default function AdhkarPage() {
  const [data, setData] = useState<HisnData>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/adhkar/hisn.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load adhkar");
        }

        return response.json();
      })
      .then((json: HisnData) => {
        setData(json);
      })
      .catch(() => {
        setData({});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sections = useMemo(() => {
    return Object.entries(data);
  }, [data]);

  const searchResults = useMemo(() => {
    const query = normalize(search);

    if (!query) return [];

    return sections.filter(([title, section]) => {
      if (normalize(title).includes(query)) {
        return true;
      }

      return (section.Adhkar || []).some((item) =>
        normalize(item.Text).includes(query)
      );
    });
  }, [sections, search]);

  const totalAdhkar = useMemo(() => {
    return sections.reduce(
      (total, [, section]) => total + (section.Adhkar?.length || 0),
      0
    );
  }, [sections]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 pb-20 md:px-6">

      <section className="relative overflow-hidden rounded-[2rem] border border-emerald-200/70 bg-white/90 p-7 shadow-sm backdrop-blur-xl dark:border-emerald-900/40 dark:bg-slate-900/85 md:p-10">

        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
            <span>📿</span>
            <span>حصن المسلم</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-stone-900 dark:text-white md:text-5xl">
            الأذكار والأدعية
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-stone-600 dark:text-slate-400 md:text-base">
            مجموعة واسعة من الأذكار والأدعية من كتاب حصن المسلم،
            مع إمكانية البحث والقراءة والعدّ أثناء الذكر.
          </p>

          {!loading && (
            <div className="mt-5 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-stone-100 px-4 py-2 text-stone-600 dark:bg-slate-800 dark:text-slate-300">
                {sections.length} بابًا
              </span>

              <span className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                {totalAdhkar} ذكرًا ودعاءً
              </span>
            </div>
          )}

          <div className="mt-7">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث في الأذكار والأبواب..."
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

        </div>
      </section>

      {search.trim() ? (
        <section className="mt-7">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900 dark:text-white">
              نتائج البحث
            </h2>

            <span className="text-xs text-stone-500 dark:text-slate-500">
              {searchResults.length} نتيجة
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white/70 p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
              <p className="text-sm text-stone-500 dark:text-slate-400">
                لا توجد نتائج مطابقة.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {searchResults.map(([title, section], index) => (
                <Link
                  key={`${title}-${index}`}
                  href={`/adhkar/all?search=${encodeURIComponent(title)}`}
                  className="group rounded-2xl border border-stone-200 bg-white/90 p-5 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-stone-900 transition group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                        {title}
                      </h3>

                      <p className="mt-2 text-xs text-stone-500 dark:text-slate-500">
                        {section.Adhkar?.length || 0} ذكر
                      </p>
                    </div>

                    <span className="text-emerald-500">←</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </section>
      ) : (
        <>
          <section className="mt-8">

            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                  الأذكار اليومية
                </h2>

                <p className="mt-1 text-xs text-stone-500 dark:text-slate-500">
                  أكثر الأبواب استخدامًا
                </p>
              </div>

              <Link
                href="/adhkar/all"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400"
              >
                جميع الأذكار
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {featuredCategories.map((category) => {

                const count = sections.filter(([title]) =>
                  getCategoryMatch(title, category.key)
                ).reduce(
                  (total, [, section]) =>
                    total + (section.Adhkar?.length || 0),
                  0
                );

                return (
                  <Link
                    key={category.key}
                    href={`/adhkar/${category.key}`}
                    className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/85"
                  >

                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/5 transition group-hover:bg-emerald-500/10" />

                    <div className="relative">

                      <div className="mb-5 flex items-center justify-between">
                        <span className="text-3xl">
                          {category.icon}
                        </span>

                        <span className="text-emerald-500 transition-transform group-hover:-translate-x-1">
                          ←
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        {category.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-stone-500 dark:text-slate-400">
                        {category.description}
                      </p>

                      {!loading && (
                        <div className="mt-5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {count} ذكر
                        </div>
                      )}

                    </div>

                  </Link>
                );
              })}

            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-stone-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-900/70 md:p-8">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                  مكتبة حصن المسلم
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-500 dark:text-slate-400">
                  تصفح جميع أبواب الأذكار الموجودة في قاعدة البيانات،
                  وعددها أكثر من مئة باب.
                </p>
              </div>

              <Link
                href="/adhkar/all"
                className="shrink-0 rounded-2xl bg-emerald-600 px-6 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
              >
                تصفح جميع الأبواب
              </Link>

            </div>

          </section>
        </>
      )}

    </main>
  );
}
