"use client";

import Link from "next/link";

import { useSyncExternalStore } from "react";

const subscribeToRiwaya = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getRiwayaSnapshot = () => {
  const saved = localStorage.getItem("quran-riwaya");
  return saved === "hafs" ? "hafs" : "warsh";
};

const getRiwayaServerSnapshot = () => "warsh";

export default function SettingsPage() {
  const riwaya = useSyncExternalStore(
    subscribeToRiwaya,
    getRiwayaSnapshot,
    getRiwayaServerSnapshot
  );

  const changeRiwaya = (value: "warsh" | "hafs") => {
    localStorage.setItem("quran-riwaya", value);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "quran-riwaya",
        newValue: value,
      })
    );
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900 dark:bg-stone-950 dark:text-stone-100"
    >
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-block text-emerald-700 dark:text-emerald-400"
        >
          ← الرئيسية
        </Link>

        <h1 className="mb-3 text-4xl font-bold">الإعدادات</h1>

        <p className="mb-8 leading-8 text-stone-600 dark:text-stone-400">
          اختر الإعدادات التي تناسب طريقة استخدامك للموقع.
        </p>

        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-stone-900">
          <h2 className="mb-2 text-2xl font-bold">رواية القرآن</h2>

          <p className="mb-6 leading-8 text-stone-600 dark:text-stone-400">
            اختر الرواية التي تقرأ بها في مصحفك.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => changeRiwaya("warsh")}
              className={`rounded-2xl border p-5 text-right transition ${
                riwaya === "warsh"
                  ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950"
                  : "border-stone-200 bg-stone-50 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
              }`}
            >
              <div className="text-xl font-bold">ورش عن نافع</div>

              <div className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                الرواية المختارة حاليًا
              </div>
            </button>

            <button
              type="button"
              onClick={() => changeRiwaya("hafs")}
              className={`rounded-2xl border p-5 text-right transition ${
                riwaya === "hafs"
                  ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950"
                  : "border-stone-200 bg-stone-50 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-700"
              }`}
            >
              <div className="text-xl font-bold">حفص عن عاصم</div>

              <div className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                الرواية المختارة حاليًا
              </div>
            </button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/favorites"
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-stone-900"
          >
            <h2 className="text-xl font-bold">☆ المفضلة</h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              إدارة العناصر المحفوظة.
            </p>
          </Link>

          <Link
            href="/continue-reading"
            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-stone-900"
          >
            <h2 className="text-xl font-bold">📖 متابعة القراءة</h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              العودة إلى آخر موضع قراءة محفوظ.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
