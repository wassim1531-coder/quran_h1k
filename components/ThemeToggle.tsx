"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("theme-change", onStoreChange);
  return () => window.removeEventListener("theme-change", onStoreChange);
};

const getSnapshot = () => {
  if (typeof window === "undefined") return true;
  return document.documentElement.classList.contains("dark");
};

const getServerSnapshot = () => true;

export default function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("quran-h1k-theme", nextDark ? "dark" : "light");

    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm transition hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
      aria-label={dark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
    >
      {dark ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي"}
    </button>
  );
}
