"use client";

import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore, useState } from "react";

type Ayah = {
  aya_no: number;
  sura_no?: number;
  sora?: number;
  sura_name_ar?: string;
  sora_name_ar?: string;
  sura_name_en?: string;
  sora_name_en?: string;
  page?: number | string;
  aya_text?: string;
};

type Surah = {
  number: number;
  name: string;
  nameEn: string;
  numberOfAyahs: number;
};

const RIWAYAS = {
  warsh: {
    label: "ورش عن نافع",
    file: "/data/quran/warshData_v10.json",
  },
  hafs: {
    label: "حفص عن عاصم",
    file: "/data/quran/hafsData_v18.json",
  },
} as const;

const subscribeToRiwaya = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getRiwayaSnapshot = (): keyof typeof RIWAYAS => {
  const saved = localStorage.getItem("quran-riwaya");
  return saved === "hafs" ? "hafs" : "warsh";
};

const getRiwayaServerSnapshot = (): keyof typeof RIWAYAS => "warsh";

export default function QuranPage() {
  const riwaya = useSyncExternalStore(
    subscribeToRiwaya,
    getRiwayaSnapshot,
    getRiwayaServerSnapshot
  );
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuran() {
      setLoading(true);

      try {
        const response = await fetch(RIWAYAS[riwaya].file);

        if (!response.ok) {
          throw new Error("Failed to load Quran data");
        }

        const data = await response.json();
        setAyahs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setAyahs([]);
      } finally {
        setLoading(false);
      }
    }

    loadQuran();
  }, [riwaya]);

  const surahs = useMemo<Surah[]>(() => {
    const map = new Map<number, Surah>();

    for (const ayah of ayahs) {
      const number = ayah.sura_no ?? ayah.sora;

      if (!number || map.has(number)) {
        continue;
      }

      const name =
        ayah.sura_name_ar ??
        ayah.sora_name_ar ??
        `السورة ${number}`;

      const nameEn =
        ayah.sura_name_en ??
        ayah.sora_name_en ??
        "";

      map.set(number, {
        number,
        name: name.trim(),
        nameEn,
        numberOfAyahs: 0,
      });
    }

    for (const ayah of ayahs) {
      const number = ayah.sura_no ?? ayah.sora;

      if (number && map.has(number)) {
        map.get(number)!.numberOfAyahs += 1;
      }
    }

    return Array.from(map.values()).sort((a, b) => a.number - b.number);
  }, [ayahs]);

  const filteredSurahs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return surahs;
    }

    return surahs.filter((surah) => {
      return (
        surah.name.toLowerCase().includes(query) ||
        surah.nameEn.toLowerCase().includes(query) ||
        surah.number.toString().includes(query)
      );
    });
  }, [surahs, searchQuery]);

  function changeRiwaya(next: keyof typeof RIWAYAS) {
    localStorage.setItem("quran-riwaya", next);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "quran-riwaya",
        newValue: next,
      })
    );
  }

  return (
    <main className="min-h-screen bg-stone-100 dark:bg-slate-950 text-stone-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 md:text-4xl">
            القرآن الكريم
          </h1>

          <p className="mt-3 text-stone-600 dark:text-slate-400">
            اختر الرواية التي تقرأ بها
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => changeRiwaya("warsh")}
            className={`rounded-xl border px-5 py-3 font-semibold transition ${
              riwaya === "warsh"
                ? "border-emerald-500 bg-emerald-600 text-white"
                : "border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-stone-700 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            ورش عن نافع
          </button>

          <button
            type="button"
            onClick={() => changeRiwaya("hafs")}
            className={`rounded-xl border px-5 py-3 font-semibold transition ${
              riwaya === "hafs"
                ? "border-emerald-500 bg-emerald-600 text-white"
                : "border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-stone-700 dark:text-slate-300 hover:border-emerald-500"
            }`}
          >
            حفص عن عاصم
          </button>
        </div>

        <div className="mb-8">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="ابحث عن السورة بالاسم أو الرقم..."
            className="w-full rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-4 text-right text-stone-900 dark:text-slate-100 outline-none transition placeholder:text-stone-500 dark:placeholder:text-slate-500 focus:border-emerald-500"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 dark:text-slate-100">
            سور القرآن الكريم
          </h2>

          <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {filteredSurahs.length} / 114
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-stone-600 dark:text-slate-400">
            جاري تحميل القرآن الكريم...
          </div>
        ) : surahs.length !== 114 ? (
          <div className="rounded-2xl border border-red-900/50 bg-red-950/30 p-8 text-center">
            <p className="font-semibold text-red-400">
              تم تحميل {surahs.length} سورة فقط من أصل 114.
            </p>
            <p className="mt-2 text-sm text-stone-600 dark:text-slate-400">
              تحقق من ملفات بيانات القرآن الموجودة في public/data/quran.
            </p>
          </div>
        ) : filteredSurahs.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center text-stone-600 dark:text-slate-400">
            لا توجد سورة مطابقة لبحثك.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSurahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/quran/${surah.number}`}
                className="group rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-stone-50 dark:hover:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950 font-bold text-emerald-700 dark:text-emerald-400 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    {surah.number}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-stone-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                      سورة {surah.name}
                    </h3>

                    <p className="mt-1 text-xs text-stone-600 dark:text-slate-400">
                      {surah.numberOfAyahs} آية
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
