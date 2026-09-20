"use client";

import Link from "next/link";

interface TajweedTopic {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const topics: TajweedTopic[] = [
  { id: "makharij", title: "مخارج الحروف", desc: "دراسة مواضع خروج الحروف العربية الصحيحة من الحلق واللسان والشفتين.", icon: "🗣️" },
  { id: "sifat", title: "صفات الحروف", desc: "التعرف على الصفات الذاتية والعارضة مثل الهمس والجهر والقلقلة.", icon: "✨" },
  { id: "noon", title: "أحكام النون الساكنة والتنوين", desc: "شرح الإظهار، الإدغام، الإقلاب، والإخفاء مع الأمثلة.", icon: "📖" },
  { id: "meem", title: "أحكام الميم الساكنة", desc: "شرح الإخفاء الشفوي، إدغام المتماثلين، والإظهار الشفوي.", icon: "📜" },
  { id: "madd", title: "أحكام المدود", desc: "أنواع المد الطبيعي والفرعي وأسباب المد من همز أو سكون.", icon: "📏" },
  { id: "waqf", title: "الوقف والابتداء", desc: "قواعد الوقف التام، الكافي، الحسن، والَقبيح لضبط المعاني.", icon: "🛑" },
];

export default function TajweedIndexPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <div className="bg-white/90 dark:bg-slate-900/80 p-6 rounded-2xl border border-stone-200 dark:border-emerald-900/30">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
          تعليم علم التجويد
        </h1>
        <p className="text-stone-600 dark:text-slate-400 text-sm mt-1">
          دروس مبسطة وموثقة لرواية القرآن الكريم وتجويده بالشكل الصحيح.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/learn/quran/${topic.id}`}
            className="p-6 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-stone-50 dark:hover:bg-slate-900 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl mb-3">{topic.icon}</div>

              <h2 className="text-xl font-bold text-stone-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                {topic.title}
              </h2>

              <p className="text-stone-600 dark:text-slate-400 text-sm leading-relaxed mt-2">
                {topic.desc}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-slate-800 text-xs text-emerald-700 dark:text-emerald-400 font-medium group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
              بدء الدرس ←
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
