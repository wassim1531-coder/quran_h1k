import Link from "next/link";

export default function SifatPage() {
  const qualities = [
    {
      title: "الهمس والجهر",
      first: "الهمس",
      firstText:
        "جريان النفس عند النطق بالحرف، وحروفه مجموعة في قولهم: فَحَثَّهُ شَخْصٌ سَكَتْ.",
      second: "الجهر",
      secondText:
        "انحباس جريان النفس عند النطق بالحرف، وهو في بقية الحروف.",
    },
    {
      title: "الشدة والتوسط والرخاوة",
      first: "الشدة",
      firstText:
        "انحباس جريان الصوت عند النطق بالحرف، وحروفها: أَجِدْ قَطٍ بَكَتْ.",
      second: "التوسط",
      secondText:
        "اعتدال جريان الصوت، وحروفه: لِنْ عُمَرْ.",
      third: "الرخاوة",
      thirdText:
        "جريان الصوت عند النطق بالحرف، وهي في بقية الحروف.",
    },
    {
      title: "الاستعلاء والاستفال",
      first: "الاستعلاء",
      firstText:
        "ارتفاع اللسان إلى الحنك الأعلى عند النطق بالحرف، وحروفه: خُصَّ ضَغْطٍ قِظْ.",
      second: "الاستفال",
      secondText:
        "انخفاض اللسان عن الحنك الأعلى عند النطق بالحرف، وهو في بقية الحروف.",
    },
    {
      title: "الإطباق والانفتاح",
      first: "الإطباق",
      firstText:
        "التصاق جزء من اللسان بالحنك الأعلى عند النطق بالحرف، وحروفه: ص، ض، ط، ظ.",
      second: "الانفتاح",
      secondText:
        "ابتعاد اللسان عن الحنك الأعلى عند النطق بالحرف، وهو في بقية الحروف.",
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
            الدرس الثالث
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            صفات الحروف
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            صفات الحروف هي الكيفيات التي تعرض للحرف عند النطق به، ومعرفتها
            تساعد على تمييز الحروف وإعطائها حقها في التلاوة.
          </p>
        </div>

        <section className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ما المقصود بصفات الحروف؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            الصفة في علم التجويد هي كيفية تعرض للحرف عند خروجه من مخرجه، مثل
            الهمس والجهر، والشدة والرخاوة، والاستعلاء والاستفال.
          </p>

          <p className="mt-4 leading-8 text-stone-300">
            وتساعد دراسة هذه الصفات على معرفة الفرق بين الحروف المتقاربة في
            المخرج، وعلى أداء الحرف بطريقة صحيحة أثناء التلاوة.
          </p>
        </section>

        <div className="mt-6 space-y-5">
          {qualities.map((quality) => (
            <article
              key={quality.title}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-stone-100">
                {quality.title}
              </h2>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-stone-950/50 p-5">
                  <h3 className="font-bold text-emerald-300">
                    {quality.first}
                  </h3>

                  <p className="mt-3 leading-8 text-stone-300">
                    {quality.firstText}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-stone-950/50 p-5">
                  <h3 className="font-bold text-emerald-300">
                    {quality.second}
                  </h3>

                  <p className="mt-3 leading-8 text-stone-300">
                    {quality.secondText}
                  </p>
                </div>

                {quality.third && (
                  <div className="rounded-2xl border border-white/10 bg-stone-950/50 p-5">
                    <h3 className="font-bold text-emerald-300">
                      {quality.third}
                    </h3>

                    <p className="mt-3 leading-8 text-stone-300">
                      {quality.thirdText}
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ملاحظة مهمة</h2>

          <p className="mt-5 leading-8 text-stone-300">
            الصفات في علم التجويد أكثر من هذه الأمثلة، ومنها صفات لها ضد وصفات
            لا ضد لها. وسيأتي تفصيل ذلك في الدروس المتقدمة.
          </p>
        </section>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Link
            href="/learn/quran/makharij"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-stone-300 transition hover:border-emerald-400/30 hover:bg-white/5"
          >
            ← الدرس السابق
          </Link>

          <Link
            href="/learn/quran"
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-400"
          >
            جميع الدروس
          </Link>
        </div>
      </section>
    </main>
  );
}
