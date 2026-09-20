import Link from "next/link";

export default function NoonRulesPage() {
  const rules = [
    {
      number: 1,
      title: "الإظهار",
      letters: "ء هـ ع ح غ خ",
      description:
        "هو إخراج النون الساكنة أو التنوين من مخرجهما من غير غنة زائدة، إذا جاء بعدهما أحد حروف الحلق الستة.",
      examples: ["مَنْ آمَنَ", "مَنْ هَادَ", "أَنْعَمْتَ", "سَمِيعٌ عَلِيمٌ"],
      note: "تظهر النون الساكنة أو التنوين بوضوح، ولا يحصل إدغام بينهما وبين الحرف التالي.",
    },
    {
      number: 2,
      title: "الإدغام",
      letters: "ي ر م ل و ن",
      description:
        "هو إدخال النون الساكنة أو التنوين في الحرف الذي بعدهما حتى يصيرا حرفًا واحدًا مشددًا من جنس الحرف الثاني.",
      examples: ["مَنْ يَعْمَلْ", "مِنْ رَبِّهِمْ", "مِنْ مَالٍ", "هُدًى لِّلْمُتَّقِينَ"],
      note: "حروف الإدغام مجموعة في كلمة: يرملون. وينقسم إلى إدغام بغنة وإدغام بغير غنة.",
    },
    {
      number: 3,
      title: "الإقلاب",
      letters: "ب",
      description:
        "هو قلب النون الساكنة أو التنوين ميمًا مخفاة مع الغنة إذا جاء بعدهما حرف الباء.",
      examples: ["أَنْبِئْهُمْ", "سَمِيعٌ بَصِيرٌ"],
      note: "إذا جاءت النون الساكنة أو التنوين قبل الباء، تتحول النون في النطق إلى ميم مخفاة مع الغنة.",
    },
    {
      number: 4,
      title: "الإخفاء",
      letters: "ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ",
      description:
        "هو النطق بالنون الساكنة أو التنوين بحالة بين الإظهار والإدغام، مع بقاء الغنة.",
      examples: ["مِنْ صَلْصَالٍ", "أَنْزَلْنَا", "مِنْ شَرٍّ", "عَلِيمٌ خَبِيرٌ"],
      note: "حروف الإخفاء خمسة عشر حرفًا، وهي بقية الحروف بعد حروف الإظهار والإدغام والإقلاب.",
    },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-stone-950 text-white selection:bg-emerald-500/30"
    >
      <header className="sticky top-0 z-30 border-b border-white/10 bg-stone-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight transition hover:text-emerald-400"
          >
            quran_h1k
          </Link>

          <Link
            href="/learn/quran"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-stone-300 transition hover:border-emerald-400/30 hover:bg-white/5 hover:text-white"
          >
            تعليم القرآن
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-medium text-emerald-400">
            الدرس الرابع
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            أحكام النون الساكنة والتنوين
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            النون الساكنة والتنوين لهما أربعة أحكام أساسية عند مجيء حرف بعدهما:
            الإظهار، والإدغام، والإقلاب، والإخفاء.
          </p>
        </div>

        <section className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">أولًا: ما النون الساكنة؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            النون الساكنة هي النون الخالية من الحركة، وتكون في الأسماء والأفعال
            والحروف، وتكون في وسط الكلمة وآخرها.
          </p>

          <h2 className="mt-8 text-2xl font-bold">ثانيًا: ما التنوين؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            التنوين نون ساكنة زائدة تلحق آخر الاسم لفظًا لا خطًا، وتظهر في صورة
            ضمتين أو فتحتين أو كسرتين.
          </p>
        </section>

        <div className="mt-6 space-y-6">
          {rules.map((rule) => (
            <article
              key={rule.number}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 font-bold text-emerald-400">
                  {rule.number}
                </span>

                <div>
                  <h2 className="text-2xl font-bold text-stone-100">
                    {rule.title}
                  </h2>

                  <p className="mt-2 font-serif text-xl tracking-wide text-emerald-300">
                    {rule.letters}
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-8 text-stone-300">
                {rule.description}
              </p>

              <div className="mt-6">
                <p className="text-sm font-medium text-stone-500">
                  أمثلة قرآنية
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {rule.examples.map((example) => (
                    <div
                      key={example}
                      className="rounded-2xl border border-white/10 bg-stone-950/60 p-4 text-center"
                    >
                      <p className="font-serif text-xl leading-loose text-stone-100">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
                <p className="text-sm font-medium text-emerald-300">
                  ملاحظة
                </p>

                <p className="mt-2 leading-7 text-stone-400">
                  {rule.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-2xl font-bold">طريقة سهلة للحفظ</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 p-4">
              <span className="font-bold text-emerald-400">6 حروف</span>
              <p className="mt-2 text-stone-300">
                الإظهار: حروف الحلق.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <span className="font-bold text-emerald-400">6 حروف</span>
              <p className="mt-2 text-stone-300">
                الإدغام: يرملون.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <span className="font-bold text-emerald-400">حرف واحد</span>
              <p className="mt-2 text-stone-300">
                الإقلاب: الباء.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 p-4">
              <span className="font-bold text-emerald-400">15 حرفًا</span>
              <p className="mt-2 text-stone-300">
                الإخفاء: بقية الحروف المذكورة في قاعدة الإخفاء.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Link
            href="/learn/quran"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-stone-300 transition hover:border-emerald-400/30 hover:bg-white/5"
          >
            ← جميع الدروس
          </Link>

          <Link
            href="/learn/quran"
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-400"
          >
            الدرس التالي →
          </Link>
        </div>
      </section>
    </main>
  );
}
