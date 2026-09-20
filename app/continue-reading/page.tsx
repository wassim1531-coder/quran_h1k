"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";

interface LastRead {
  surahNumber: number;
  surahName: string;
  riwaya: "warsh" | "hafs";
  date: string;
}

export default function ContinueReadingPage() {
  const lastReadRaw = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem("last-read"),
    () => null
  );

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const lastRead = useMemo<LastRead | null>(() => {
    if (!lastReadRaw) return null;

    try {
      return JSON.parse(lastReadRaw) as LastRead;
    } catch (e) {
      console.error("Failed to parse last-read data", e);
      return null;
    }
  }, [lastReadRaw]);

  const loading = !hydrated;

  if (loading) {
    return <div className="text-center py-20 text-slate-400">جاري التحقق من آخر قراءة...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-900/30">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">متابعة القراءة</h1>
        <p className="text-slate-400 text-sm mt-1">استأنف قراءتك القرآنية من حيث توقفت في جلساتك السابقة.</p>
      </div>

      {lastRead ? (
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <h2 className="text-xl font-bold text-slate-100">سورة {lastRead.surahName}</h2>
            <p className="text-xs text-slate-400">
              الرواية: <span className="text-emerald-400 font-medium">{lastRead.riwaya === "warsh" ? "ورش عن نافع" : "حفص عن عاصم"}</span>
            </p>
            <p className="text-xs text-slate-500">آخر فتح: {lastRead.date}</p>
          </div>

          <Link
            href={`/quran/${lastRead.surahNumber}`}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors shadow-lg"
          >
            متابعة القراءة الآن
          </Link>
        </div>
      ) : (
        <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
          <p className="text-slate-400">لم تقم بقراءة أي سورة بعد، أو تم مسح ذاكرة التصفح.</p>
          <Link
            href="/quran"
            className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
          >
            الانتقال للقرآن الكريم
          </Link>
        </div>
      )}
    </div>
  );
}
