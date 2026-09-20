"use client";

import Link from "next/link";

import { useState } from "react";

type Favorite = {
  title: string;
  description: string;
  href: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem("quran-h1k-favorites");
      return saved ? (JSON.parse(saved) as Favorite[]) : [];
    } catch {
      return [];
    }
  });

  const removeFavorite = (href: string) => {
    const updated = favorites.filter((item) => item.href !== href);

    setFavorites(updated);
    localStorage.setItem(
      "quran-h1k-favorites",
      JSON.stringify(updated)
    );
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900"
    >
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-block text-emerald-700">
          ← الرئيسية
        </Link>

        <h1 className="mb-3 text-4xl font-bold">المفضلة</h1>

        <p className="mb-8 leading-8 text-stone-600">
          احفظ ما تريد الرجوع إليه بسهولة.
        </p>

        {favorites.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">♡</div>

            <h2 className="mb-3 text-2xl font-bold">
              لا توجد عناصر محفوظة
            </h2>

            <p className="text-stone-500">
              ستظهر هنا السور والأحاديث والأذكار التي تضيفها إلى المفضلة.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {favorites.map((favorite) => (
              <div
                key={favorite.href}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <Link href={favorite.href} className="block">
                  <h2 className="mb-2 text-2xl font-bold">
                    {favorite.title}
                  </h2>

                  <p className="text-stone-600">
                    {favorite.description}
                  </p>
                </Link>

                <button
                  type="button"
                  onClick={() => removeFavorite(favorite.href)}
                  className="mt-5 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                >
                  إزالة من المفضلة
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
