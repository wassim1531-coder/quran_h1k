"use client";

import Link from "next/link";

const communitySections = [
  {
    href: "/community/chat",
    icon: "💬",
    title: "الدردشة العامة",
    description:
      "تحدث مع أفراد المجتمع وشارك أفكارك وأسئلتك وفوائدك في مساحة مخصصة للنقاش.",
    label: "ابدأ الدردشة",
  },
  {
    href: "/community/feedback",
    icon: "📝",
    title: "ملاحظات واقتراحات",
    description:
      "هناك شيء لم يعجبك؟ وجدت خطأ؟ لديك فكرة لتطوير الموقع؟ أخبرنا بما تريد تحسينه.",
    label: "أرسل ملاحظتك",
  },
  {
    href: "/community/tajweed",
    icon: "🎙️",
    title: "تجويد القرآن",
    description:
      "شارك تسجيلًا صوتيًا لتلاوتك، واختر السورة والرواية، واستفد من ملاحظات أفراد المجتمع.",
    label: "شارك تلاوتك",
  },
  {
    href: "/community/benefits",
    icon: "📚",
    title: "الفوائد والمشاركات",
    description:
      "شارك فائدة قرآنية أو حديثًا موثقًا أو فائدة في التجويد مع بقية أفراد المجتمع.",
    label: "شارك فائدة",
  },
  {
    href: "/community/questions",
    icon: "❓",
    title: "الأسئلة والأجوبة",
    description:
      "اطرح أسئلتك وشارك ما تعرفه مع الآخرين، مع الحرص على التثبت من المعلومات الشرعية.",
    label: "تصفح الأسئلة",
  },
];

export default function CommunityPage() {
  return (
    <div className="space-y-12 py-8">
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/80 px-6 py-12 text-center shadow-2xl md:px-12">
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/60 text-3xl shadow-lg">
            🕌
          </div>

          <p className="mb-3 text-sm font-medium tracking-widest text-emerald-400">
            QURAN_H1K COMMUNITY
          </p>

          <h1 className="text-3xl font-bold text-white md:text-5xl">
            مجتمع quran_h1k
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            مساحة للتواصل والمشاركة حول القرآن الكريم والحديث والأذكار والتجويد،
            مع إمكانية مشاركة التلاوات والأفكار والاقتراحات.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-6 text-right">
          <h2 className="text-2xl font-bold text-white">مساحة المجتمع</h2>
          <p className="mt-2 text-sm text-slate-400">
            اختر القسم الذي تريد المشاركة فيه.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communitySections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-slate-900/80 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-emerald-950/40"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/5 blur-2xl transition-all duration-300 group-hover:bg-emerald-500/10" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-950/70 text-2xl transition-transform duration-300 group-hover:scale-105">
                  {section.icon}
                </div>

                <h3 className="text-xl font-bold text-white">
                  {section.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-400">
                  {section.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
                  <span>{section.label}</span>
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-500/15 bg-amber-950/10 p-6">
        <div className="flex gap-4">
          <div className="text-2xl">🛡️</div>

          <div>
            <h2 className="font-bold text-amber-300">آداب المجتمع</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              نريد أن يبقى هذا المكان محترمًا ونافعًا للجميع. تجنب الإساءة
              والسب ونشر المعلومات غير الموثوقة، وتثبت من الأحاديث والاقتباسات
              قبل مشاركتها.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}