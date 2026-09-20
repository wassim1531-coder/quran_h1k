"use client";

import { useEffect, useMemo, useState, use } from "react";
import Link from "next/link";

interface DhikrItem {
  id: number;
  text: string;
  count: number;
  source: string;
}

interface HisnSection {
  Audio?: string;
  Adhkar: {
    Text: string;
    Count: number;
    Reference: string;
  }[];
}

interface HisnData {
  [key: string]: HisnSection;
}

const categoryTitles: Record<string, string> = {
  morning: "أذكار الصباح",
  evening: "أذكار المساء",
  "after-prayer": "أذكار ما بعد الصلاة",
  sleep: "أذكار النوم والاستيقاظ",
  home: "أذكار المنزل",
  travel: "أذكار السفر",
  all: "جميع الأذكار",
};

const categoryDescriptions: Record<string, string> = {
  morning: "أذكار الصباح من الكتاب والسنة.",
  evening: "أذكار المساء من الكتاب والسنة.",
  "after-prayer": "الأذكار الواردة بعد الصلاة.",
  sleep: "أذكار النوم والاستيقاظ من النوم.",
  home: "الأذكار المتعلقة بالمنزل والدخول والخروج.",
  travel: "أذكار السفر والركوب والنزول.",
  all: "مكتبة واسعة من الأذكار والأدعية من حصن المسلم.",
};

function matchesCategory(title: string, category: string) {
  const t = title.replace(/َ|ً|ُ|ٌ|ِ|ٍ|ْ|ّ/g, "");

  if (category === "all") return true;

  if (category === "morning") {
    return /الصباح|الصبح/.test(t);
  }

  if (category === "evening") {
    return /المساء|المسي/.test(t);
  }

  if (category === "after-prayer") {
    return /بعد.*الصلاة|السلام.*الصلاة|الصلوات/.test(t);
  }

  if (category === "sleep") {
    return /النوم|الاستيقاظ|الليل/.test(t);
  }

  if (category === "home") {
    return /المنزل|البيت/.test(t);
  }

  if (category === "travel") {
    return /السفر|الركوب|مسافر|منزل|الطريق/.test(t);
  }

  return false;
}

export default function AdhkarCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;

  const [data, setData] = useState<HisnData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [counters, setCounters] = useState<Record<string, number>>({});
  const [currentAudio, setCurrentAudio] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/data/adhkar/hisn.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed");
        return response.json();
      })
      .then((json: HisnData) => {
        if (!cancelled) {
          setData(json);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("تعذر تحميل الأذكار.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sections = useMemo(() => {
    return Object.entries(data).filter(([title]) =>
      matchesCategory(title, category)
    );
  }, [data, category]);

  const items = useMemo<DhikrItem[]>(() => {
    const result: DhikrItem[] = [];

    sections.forEach(([sectionTitle, section]) => {
      section.Adhkar?.forEach((item, index) => {
        result.push({
          id: result.length + 1,
          text: item.Text,
          count: Number(item.Count) || 1,
          source: `${sectionTitle} — ${item.Reference}`,
        });
      });
    });

    const query = search.trim();

    if (!query) return result;

    return result.filter(
      (item) =>
        item.text.includes(query) ||
        item.source.includes(query)
    );
  }, [sections, search]);

  useEffect(() => {
    const initial: Record<string, number> = {};

    items.forEach((item) => {
      initial[String(item.id)] = item.count;
    });

    setCounters(initial);
  }, [items]);

  const handleDecrement = (id: number) => {
    setCounters((previous) => {
      const current = previous[String(id)] ?? 0;

      if (current <= 0) {
        return previous;
      }

      return {
        ...previous,
        [String(id)]: current - 1,
      };
    });
  };

  const resetAll = () => {
    const reset: Record<string, number> = {};

    items.forEach((item) => {
      reset[String(item.id)] = item.count;
    });

    setCounters(reset);
  };

  const title = categoryTitles[category] || "الأذكار";
  const description =
    categoryDescriptions[category] ||
    "أذكار وأدعية من الكتاب والسنة.";

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-6 pb-20">

      <section className="rounded-3xl border border-emerald-200 bg-white/90 p-6 shadow-sm backdrop-blur-md dark:border-emerald-900/30 dark:bg-slate-900/80 md:p-8">

        <Link
          href="/adhkar"
          className="mb-4 inline-block text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          ← قائمة الأذكار
        </Link>

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 md:text-4xl">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-slate-400">
              {description}
            </p>

            {!loading && !error && (
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-500">
                {items.length} ذكر ودعاء
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث في الأذكار..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:w-64"
            />

            <button
              type="button"
              onClick={resetAll}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400"
            >
              إعادة العدادات
            </button>

          </div>
        </div>
      </section>

      {loading && (
        <div className="rounded-3xl border border-stone-200 bg-white/90 p-12 text-center dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-stone-600 dark:text-slate-400">
            جاري تحميل الأذكار...
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-white/70 p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-stone-600 dark:text-slate-400">
            لم يتم العثور على أذكار مطابقة.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-5">

          {items.map((item) => {
            const currentCount =
              counters[String(item.id)] ?? item.count;

            const isDone = currentCount === 0;

            return (
              <article
                key={item.id}
                className={`rounded-3xl border p-6 transition-all md:p-8 ${
                  isDone
                    ? "border-stone-200 bg-stone-100/70 opacity-65 dark:border-slate-800 dark:bg-slate-950/50"
                    : "border-stone-200 bg-white/95 shadow-sm hover:border-emerald-400/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90"
                }`}
              >

                <div className="mb-5 flex flex-col gap-3 border-b border-stone-200 pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-xs leading-6 text-stone-500 dark:text-slate-400">
                    {item.source}
                  </span>

                  <span className="w-fit rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    التكرار: {item.count}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() => handleDecrement(item.id)}
                  disabled={isDone}
                  className="w-full text-center"
                >
                  <p
                    dir="rtl"
                    className="whitespace-pre-line font-serif text-xl leading-[2.3] text-stone-900 dark:text-slate-100 md:text-2xl"
                  >
                    {item.text}
                  </p>
                </button>

                <div className="mt-6 flex items-center justify-center gap-3">

                  <button
                    type="button"
                    onClick={() => handleDecrement(item.id)}
                    disabled={isDone}
                    className={`min-w-32 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                      isDone
                        ? "cursor-default bg-emerald-950 text-emerald-500"
                        : "bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 active:scale-95"
                    }`}
                  >
                    {isDone
                      ? "تم القراءة ✓"
                      : `المتبقي: ${currentCount}`}
                  </button>

                  {currentAudio && (
                    <button
                      type="button"
                      onClick={() => setCurrentAudio("")}
                      className="rounded-xl border border-stone-200 px-4 py-3 text-xs text-stone-500 hover:bg-stone-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                    >
                      إيقاف الصوت
                    </button>
                  )}

                </div>

              </article>
            );
          })}

        </div>
      )}

      {currentAudio && (
        <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-emerald-900/40 dark:bg-slate-950/95">
          <audio
            controls
            autoPlay
            src={currentAudio}
            className="w-full"
          />
        </div>
      )}

    </div>
  );
}
