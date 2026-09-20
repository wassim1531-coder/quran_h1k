"use client";

import { useEffect, useMemo, useState } from "react";

interface Moshaf {
  id: number;
  name: string;
  rewaya_id: number;
  server: string;
  surah_total: number;
  surah_list: string;
}

interface Reciter {
  id: number;
  name: string;
  letter?: string;
  moshaf: Moshaf[];
}

interface ReciterOption {
  reciter: Reciter;
  moshaf: Moshaf;
}

const surahNames = [
  "الفاتحة",
  "البقرة",
  "آل عمران",
  "النساء",
  "المائدة",
  "الأنعام",
  "الأعراف",
  "الأنفال",
  "التوبة",
  "يونس",
  "هود",
  "يوسف",
  "الرعد",
  "إبراهيم",
  "الحجر",
  "النحل",
  "الإسراء",
  "الكهف",
  "مريم",
  "طه",
  "الأنبياء",
  "الحج",
  "المؤمنون",
  "النور",
  "الفرقان",
  "الشعراء",
  "النمل",
  "القصص",
  "العنكبوت",
  "الروم",
  "لقمان",
  "السجدة",
  "الأحزاب",
  "سبأ",
  "فاطر",
  "يس",
  "الصافات",
  "ص",
  "الزمر",
  "غافر",
  "فصلت",
  "الشورى",
  "الزخرف",
  "الدخان",
  "الجاثية",
  "الأحقاف",
  "محمد",
  "الفتح",
  "الحجرات",
  "ق",
  "الذاريات",
  "الطور",
  "النجم",
  "القمر",
  "الرحمن",
  "الواقعة",
  "الحديد",
  "المجادلة",
  "الحشر",
  "الممتحنة",
  "الصف",
  "الجمعة",
  "المنافقون",
  "التغابن",
  "الطلاق",
  "التحريم",
  "الملك",
  "القلم",
  "الحاقة",
  "المعارج",
  "نوح",
  "الجن",
  "المزمل",
  "المدثر",
  "القيامة",
  "الإنسان",
  "المرسلات",
  "النبأ",
  "النازعات",
  "عبس",
  "التكوير",
  "الانفطار",
  "المطففين",
  "الانشقاق",
  "البروج",
  "الطارق",
  "الأعلى",
  "الغاشية",
  "الفجر",
  "البلد",
  "الشمس",
  "الليل",
  "الضحى",
  "الشرح",
  "التين",
  "العلق",
  "القدر",
  "البينة",
  "الزلزلة",
  "العاديات",
  "القارعة",
  "التكاثر",
  "العصر",
  "الهمزة",
  "الفيل",
  "قريش",
  "الماعون",
  "الكوثر",
  "الكافرون",
  "النصر",
  "المسد",
  "الإخلاص",
  "الفلق",
  "الناس",
];

export default function RecitationsPage() {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ReciterOption | null>(null);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [currentAudio, setCurrentAudio] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadReciters() {
      try {
        const response = await fetch("/api/reciters");

        if (!response.ok) {
          throw new Error("Failed");
        }

        const data = await response.json();

        if (!cancelled) {
          setReciters(data.reciters || []);
        }
      } catch {
        if (!cancelled) {
          setError("تعذر تحميل قائمة القراء حاليًا.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadReciters();

    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo<ReciterOption[]>(() => {
    return reciters.flatMap((reciter) =>
      (reciter.moshaf || []).map((moshaf) => ({
        reciter,
        moshaf,
      }))
    );
  }, [reciters]);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return options;

    return options.filter(
      ({ reciter, moshaf }) =>
        reciter.name.toLowerCase().includes(query) ||
        moshaf.name.toLowerCase().includes(query)
    );
  }, [options, search]);

  const availableSurahs = useMemo(() => {
    if (!selected) return [];

    return selected.moshaf.surah_list
      .split(",")
      .map(Number)
      .filter(
        (number) => number >= 1 && number <= surahNames.length
      );
  }, [selected]);

  const playSurah = (surahNumber: number) => {
    if (!selected) return;

    const baseUrl = selected.moshaf.server.endsWith("/")
      ? selected.moshaf.server
      : `${selected.moshaf.server}/`;

    const audioUrl = `${baseUrl}${String(surahNumber).padStart(3, "0")}.mp3`;

    setCurrentSurah(surahNumber);
    setCurrentAudio(audioUrl);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-6 pb-32">

      <section className="rounded-3xl border border-emerald-200 bg-white/90 p-6 shadow-sm backdrop-blur-md dark:border-emerald-900/30 dark:bg-slate-900/80 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              القرآن الكريم
            </p>

            <h1 className="text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">
              التلاوات الصوتية
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600 dark:text-slate-400">
              استمع إلى تلاوات القرآن الكريم لكبار القراء بمختلف الروايات
              والمصاحف المتاحة.
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن قارئ أو رواية..."
              className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>
      </section>

      {loading && (
        <div className="rounded-3xl border border-stone-200 bg-white/90 p-10 text-center dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <p className="text-sm text-stone-600 dark:text-slate-400">
            جاري تحميل القراء...
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50/90 p-6 text-center text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

          <aside className="rounded-3xl border border-stone-200 bg-white/85 p-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-stone-900 dark:text-white">
                القراء
              </h2>

              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                {filteredOptions.length}
              </span>
            </div>

            <div className="max-h-[65vh] space-y-2 overflow-y-auto pr-1">
              {filteredOptions.map(({ reciter, moshaf }) => {
                const isSelected =
                  selected?.reciter.id === reciter.id &&
                  selected?.moshaf.id === moshaf.id;

                return (
                  <button
                    key={`${reciter.id}-${moshaf.id}`}
                    type="button"
                    onClick={() => {
                      setSelected({ reciter, moshaf });
                      setCurrentSurah(null);
                      setCurrentAudio("");
                    }}
                    className={`w-full rounded-2xl border p-4 text-right transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 shadow-sm dark:bg-emerald-950/40"
                        : "border-stone-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-emerald-800"
                    }`}
                  >
                    <div className="font-semibold text-stone-900 dark:text-slate-100">
                      {reciter.name}
                    </div>

                    <div className="mt-1 text-xs leading-5 text-emerald-700 dark:text-emerald-400">
                      {moshaf.name}
                    </div>
                  </button>
                );
              })}

              {filteredOptions.length === 0 && (
                <p className="py-8 text-center text-sm text-stone-500 dark:text-slate-500">
                  لا توجد نتائج.
                </p>
              )}
            </div>
          </aside>

          <main className="min-w-0">
            {!selected ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white/60 p-8 text-center dark:border-slate-700 dark:bg-slate-900/40">
                <div>
                  <div className="mb-5 text-5xl">🎙️</div>
                  <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                    اختر قارئًا
                  </h2>
                  <p className="mt-2 text-sm text-stone-500 dark:text-slate-400">
                    اختر القارئ والرواية لعرض جميع السور المتاحة.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">

                <section className="rounded-3xl border border-emerald-200 bg-white/90 p-6 dark:border-emerald-900/30 dark:bg-slate-900/80">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                        {selected.reciter.name}
                      </h2>

                      <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
                        {selected.moshaf.name}
                      </p>
                    </div>

                    <div className="rounded-xl bg-stone-100 px-3 py-2 text-xs text-stone-600 dark:bg-slate-950 dark:text-slate-400">
                      {availableSurahs.length} سورة
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {availableSurahs.map((surahNumber) => {
                    const isPlaying = currentSurah === surahNumber;

                    return (
                      <button
                        key={surahNumber}
                        type="button"
                        onClick={() => playSurah(surahNumber)}
                        className={`rounded-2xl border p-4 text-right transition-all ${
                          isPlaying
                            ? "border-emerald-500 bg-emerald-50 shadow-md dark:bg-emerald-950/50"
                            : "border-stone-200 bg-white/90 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                        }`}
                      >
                        <div className="mb-2 text-xs text-stone-500 dark:text-slate-500">
                          سورة {surahNumber}
                        </div>

                        <div className="font-bold text-stone-900 dark:text-slate-100">
                          {surahNames[surahNumber - 1]}
                        </div>

                        <div className="mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {isPlaying ? "يتم التشغيل الآن" : "تشغيل"}
                        </div>
                      </button>
                    );
                  })}
                </section>
              </div>
            )}
          </main>
        </div>
      )}

      {currentAudio && selected && (
        <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl rounded-2xl border border-emerald-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-emerald-900/40 dark:bg-slate-950/95">
          <div className="mb-2 flex items-center justify-between gap-3 px-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-stone-900 dark:text-white">
                {surahNames[(currentSurah || 1) - 1]}
              </p>

              <p className="truncate text-xs text-stone-500 dark:text-slate-400">
                {selected.reciter.name} · {selected.moshaf.name}
              </p>
            </div>
          </div>

          <audio
            key={currentAudio}
            controls
            autoPlay
            preload="metadata"
            src={currentAudio}
            className="h-10 w-full"
          />
        </div>
      )}
    </div>
  );
}
