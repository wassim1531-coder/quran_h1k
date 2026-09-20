"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/80 border-b border-stone-200 dark:border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/30 group-hover:scale-105 transition-transform">
            <img
              src="/icons/icon.jpg"
              alt="quran_h1k"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/icons/icon-192x192.png";
              }}
            />
          </div>

          <span className="font-bold text-lg text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors">
            quran_h1k
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-slate-300">
          <Link
            href="/quran"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            القرآن الكريم
          </Link>

          <Link
            href="/hadith"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            الأحاديث
          </Link>

          <Link
            href="/adhkar"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            الأذكار
          </Link>

          <Link
            href="/learn/quran"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            التجويد
          </Link>

          <Link
            href="/recitations"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            التلاوات
          </Link>

          <Link
            href="/community"
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
          >
            المجتمع
          </Link>

          <Link
            href="/search"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            البحث
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}