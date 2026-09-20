"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";

type Ayah = {
  aya_no: number;
  sura_no?: number;
  sora?: number;
  sura_name_ar?: string;
  sora_name_ar?: string;
  sura_name_en?: string;
  sora_name_en?: string;
  aya_text?: string;
  aya_text_emlaey?: string;
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

  return () => {
    window.removeEventListener("storage", onStoreChange);
  };
};

const getRiwayaSnapshot = (): keyof typeof RIWAYAS => {
  const saved = localStorage.getItem("quran-riwaya");
  return saved === "hafs" ? "hafs" : "warsh";
};

const getRiwayaServerSnapshot = (): keyof typeof RIWAYAS => {
  return "warsh";
};

export default function SurahPage() {
  const params = useParams();
  const surahNumber = Number(params.surah);

  const riwaya = useSyncExternalStore(
    subscribeToRiwaya,
    getRiwayaSnapshot,
    getRiwayaServerSnapshot
  );

  const [ayahs, setAyahs] = useState<Ayah[]>([]);

  const isValidSurah = surahNumber >= 1 && surahNumber <= 114;
  const [loading, setLoading] = useState(isValidSurah);

  useEffect(() => {
    async function loadSurah() {
      setLoading(true);

      try {
        const response = await fetch(RIWAYAS[riwaya].file);

        if (!response.ok) {
          throw new Error("Failed to load Quran data");
        }

        const data: Ayah[] = await response.json();

        const filtered = data.filter(
          (ayah) => (ayah.sura_no ?? ayah.sora) === surahNumber
        );

        setAyahs(filtered);
      } catch (error) {
        console.error(error);
        setAyahs([]);
      } finally {
        setLoading(false);
      }
    }

    if (isValidSurah) {
      void loadSurah();
    }
  }, [riwaya, surahNumber, isValidSurah]);

  const firstAyah = ayahs[0];

  const surahName =
    firstAyah?.sura_name_ar ??
    firstAyah?.sora_name_ar ??
    `السورة ${surahNumber}`;

  const surahNameEn =
    firstAyah?.sura_name_en ??
    firstAyah?.sora_name_en ??
    "";

  function changeRiwaya(next: keyof typeof RIWAYAS) {
    localStorage.setItem("quran-riwaya", next);

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "quran-riwaya",
        newValue: next,
      })
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <p className="text-stone-600 dark:text-slate-400">
            جاري تحميل السورة...
          </p>
        </div>
      </main>
    );
  }

  if (!ayahs.length) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
            لم يتم العثور على آيات هذه السورة
          </h1>

          <p className="mt-3 text-stone-600 dark:text-slate-400">
            تحقق من بيانات القرآن أو رقم السورة.
          </p>

          <Link
            href="/quran"
            className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 dark:hover:bg-emerald-500"
          >
            العودة إلى السور
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <div className="mb-8 text-center">
          <Link
            href="/quran"
            className="mb-5 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            ← العودة إلى سور القرآن
          </Link>

          <h1 className="text-4xl font-bold text-emerald-700 dark:text-emerald-400">
            سورة {surahName}
          </h1>

          {surahNameEn && (
            <p className="mt-2 text-sm text-stone-500 dark:text-slate-500">
              {surahNameEn}
            </p>
          )}

          <p className="mt-3 text-stone-600 dark:text-slate-400">
            {ayahs.length} آية • {RIWAYAS[riwaya].label}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => changeRiwaya("warsh")}
            className={`rounded-xl border px-5 py-3 font-semibold transition ${
              riwaya === "warsh"
                ? "border-emerald-500 bg-emerald-600 text-white"
                : "border-stone-300 bg-white text-stone-700 hover:border-emerald-500 hover:bg-stone-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-slate-800"
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
                : "border-stone-300 bg-white text-stone-700 hover:border-emerald-500 hover:bg-stone-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-slate-800"
            }`}
          >
            حفص عن عاصم
          </button>
        </div>

        <article className="rounded-3xl border border-emerald-200 bg-white/95 p-6 shadow-xl md:p-10 dark:border-emerald-900/40 dark:bg-slate-900/80">
          <div
            dir="rtl"
            className="text-right font-serif text-2xl leading-[2.8] text-stone-900 md:text-3xl md:leading-[3] dark:text-slate-100"
          >
            {ayahs.map((ayah) => (
              <span key={ayah.aya_no}>
                {ayah.aya_text ?? ""}
                <span className="mx-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-50 text-sm font-sans font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {ayah.aya_no}
                </span>{" "}
              </span>
            ))}
          </div>
        </article>

        <div className="mt-8 flex justify-between gap-4">
          {surahNumber > 1 ? (
            <Link
              href={`/quran/${surahNumber - 1}`}
              className="rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-500 hover:bg-stone-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-slate-800"
            >
              ← السورة السابقة
            </Link>
          ) : (
            <div />
          )}

          {surahNumber < 114 ? (
            <Link
              href={`/quran/${surahNumber + 1}`}
              className="rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-500 hover:bg-stone-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-slate-800"
            >
              السورة التالية →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}