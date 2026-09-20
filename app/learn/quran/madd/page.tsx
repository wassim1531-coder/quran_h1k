import Link from "next/link";

export default function MaddPage() {
  const maddTypes = [
    {
      number: 1,
      title: "المد الطبيعي",
      letters: "ا — و — ي",
      description:
        "هو المد الذي لا تقوم ذات حرف المد إلا به، ولا يتوقف على سبب من همز أو سكون.",
      examples: ["قَالَ", "يَقُولُ", "قِيلَ"],
      note:
        "مقداره حركتان في الأصل، وهو أساس كثير من أنواع المدود.",
    },
    {
      number: 2,
      title: "المد المتصل",
      letters: "حرف مد + همزة في الكلمة نفسها",
      description:
        "هو أن يأتي حرف المد وبعده همز في كلمة واحدة.",
      examples: ["جَاءَ", "السَّمَاءِ", "سُوءَ"],
      note:
        "هذا من المدود الفرعية، ومقداره يختلف بحسب الرواية وطريق الأداء.",
    },
    {
      number: 3,
      title: "المد المنفصل",
      letters: "حرف مد في آخر كلمة + همزة في أول الكلمة التالية",
      description:
        "هو أن يأتي حرف المد في آخر كلمة، وتأتي الهمزة في أول الكلمة التي بعدها.",
      examples: ["بِمَا أُنْزِلَ", "إِنَّا أَعْطَيْنَاكَ"],
      note:
        "مقداره وأوجهه تختلف باختلاف الرواية والطريق، لذلك يجب عدم تعميم مقدار واحد على جميع القراءات.",
    },
    {
      number: 4,
      title: "مد البدل",
      letters: "همزة قبل حرف المد",
      description:
        "هو أن تتقدم الهمزة على حرف المد في كلمة واحدة، مثل بعض الألفاظ التي يكون فيها أصل المد ناشئًا عن إبدال الهمزة.",
      examples: ["آمَنَ", "إِيمَانًا", "أُوتِيَ"],
      note:
        "له عناية خاصة في بعض الروايات، ومن ذلك رواية ورش عن نافع، ولذلك سنفصل أحكامه بحسب الرواية لاحقًا.",
    },
    {
      number: 5,
      title: "المد اللازم",
      letters: "حرف مد + سكون أصلي",
      description:
        "هو أن يأتي بعد حرف المد سكون أصلي ثابت في الوصل والوقف.",
      examples: ["الضَّالِّينَ", "الحَاقَّةُ"],
      note:
        "يمد في المشهور ست حركات، وله أقسام وتفصيلات.",
    },
    {
      number: 6,
      title: "المد العارض للسكون",
      letters: "حرف مد + سكون بسبب الوقف",
      description:
        "هو أن يأتي بعد حرف المد حرف متحرك، ثم يسكن ذلك الحرف بسبب الوقف عليه.",
      examples: ["الْعَالَمِينَ", "الرَّحِيمِ", "نَسْتَعِينُ"],
      note:
        "عند الوقف يمكن أن تختلف أوجه المد بحسب الرواية وطريقة الأداء.",
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
            الدرس السادس
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            المدود
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            المد هو إطالة الصوت بحرف من حروف المد، وله أنواع متعددة تختلف بحسب
            السبب والرواية وطريق الأداء.
          </p>
        </div>

        <section className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ما هي حروف المد؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            حروف المد ثلاثة: الألف الساكنة المفتوح ما قبلها، والواو الساكنة
            المضموم ما قبلها، والياء الساكنة المكسور ما قبلها.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 text-center">
              <p className="font-serif text-4xl text-emerald-300">ا</p>
              <p className="mt-3 text-sm text-stone-400">
                قبلها فتحة
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 text-center">
              <p className="font-serif text-4xl text-emerald-300">و</p>
              <p className="mt-3 text-sm text-stone-400">
                قبلها ضمة
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 text-center">
              <p className="font-serif text-4xl text-emerald-300">ي</p>
              <p className="mt-3 text-sm text-stone-400">
                قبلها كسرة
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 space-y-6">
          {maddTypes.map((type) => (
            <article
              key={type.number}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 font-bold text-emerald-400">
                  {type.number}
                </span>

                <div>
                  <h2 className="text-2xl font-bold text-stone-100">
                    {type.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-emerald-300">
                    {type.letters}
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-8 text-stone-300">
                {type.description}
              </p>

              <div className="mt-6">
                <p className="text-sm font-medium text-stone-500">
                  أمثلة
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {type.examples.map((example) => (
                    <div
                      key={example}
                      className="rounded-2xl border border-white/10 bg-stone-950/60 px-5 py-3"
                    >
                      <p className="font-serif text-xl text-stone-100">
                        {example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] p-5">
                <p className="text-sm font-medium text-emerald-300">
                  تنبيه
                </p>

                <p className="mt-2 leading-7 text-stone-400">
                  {type.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-2xl font-bold">تنبيه مهم حول الروايات</h2>

          <p className="mt-5 leading-8 text-stone-300">
            لا يصح أن نجعل جميع أحكام المد واحدة في كل الروايات والطرق. في
            موقعنا سنميز بين ورش عن نافع وحفص عن عاصم عند الدخول في التفاصيل
            التطبيقية، حتى تكون المعلومة مرتبطة بالرواية التي يقرأ بها المستخدم.
          </p>
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
