import Link from "next/link";

export default function MeemRulesPage() {
  const rules = [
    {
      number: 1,
      title: "الإظهار الشفوي",
      letters: "جميع الحروف ما عدا الميم والباء",
      description:
        "هو إظهار الميم الساكنة إذا جاء بعدها أي حرف من حروف الهجاء، ما عدا الميم والباء.",
      examples: ["أَنْعَمْتَ", "عَلَيْهِمْ غَيْرِ", "هُمْ فِيهَا"],
      note:
        "تُظهر الميم الساكنة بوضوح من غير إدغام ولا إخفاء، ويُعتنى ببيانها خاصة عند مجيء الفاء أو الواو بعدها.",
    },
    {
      number: 2,
      title: "الإدغام الشفوي",
      letters: "م",
      description:
        "هو إدغام الميم الساكنة في الميم المتحركة التي تأتي بعدها، فتصيران ميمًا واحدة مشددة مع الغنة.",
      examples: ["لَهُمْ مَا", "كَمْ مِنْ", "أَمْ مَنْ"],
      note:
        "يسمى أيضًا إدغام المتماثلين الصغير، ويكون عند التقاء ميم ساكنة بميم متحركة.",
    },
    {
      number: 3,
      title: "الإخفاء الشفوي",
      letters: "ب",
      description:
        "هو إخفاء الميم الساكنة عند الباء مع بقاء الغنة.",
      examples: ["تَرْمِيهِمْ بِحِجَارَةٍ", "هُمْ بِهِ", "عَلَيْهِمْ بِمَا"],
      note:
        "عند مجيء الباء بعد الميم الساكنة تُخفى الميم مع الغنة، ولذلك يسمى إخفاءً شفويًا.",
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
            الدرس الخامس
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            أحكام الميم الساكنة
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            للميم الساكنة ثلاثة أحكام عند التقاءها بالحروف بعدها: الإظهار
            الشفوي، والإدغام الشفوي، والإخفاء الشفوي.
          </p>
        </div>

        <section className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ما هي الميم الساكنة؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            الميم الساكنة هي الميم الخالية من الحركة، وتأتي في الأسماء والأفعال
            والحروف، وقد تأتي في وسط الكلمة أو في آخرها.
          </p>

          <p className="mt-4 leading-8 text-stone-300">
            وعند معرفة الحرف الذي يأتي بعد الميم الساكنة نستطيع تحديد الحكم
            التجويدي الذي يطبق عليها.
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

                  <p className="mt-2 font-serif text-xl text-emerald-300">
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

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-5">
              <p className="font-bold text-emerald-400">م + م</p>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                إدغام شفوي
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 p-5">
              <p className="font-bold text-emerald-400">م + ب</p>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                إخفاء شفوي
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 p-5">
              <p className="font-bold text-emerald-400">م + باقي الحروف</p>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                إظهار شفوي
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
