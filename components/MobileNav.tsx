"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "الرئيسية", href: "/", icon: "🏠" },
    { label: "القرآن", href: "/quran", icon: "📖" },
    { label: "الأحاديث", href: "/hadith", icon: "📜" },
    { label: "الأذكار", href: "/adhkar", icon: "🤲" },
    { label: "البحث", href: "/search", icon: "🔍" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-stone-200 dark:border-emerald-900/40 px-2 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
                isActive
                  ? "text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50"
                  : "text-stone-500 dark:text-slate-400 hover:text-stone-800 dark:hover:text-slate-200"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
