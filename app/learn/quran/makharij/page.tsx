import Link from "next/link";

export default function MakharijPage() {
  const makharij = [
    {
      number: 1,
      title: "الجوف",
      letters: "حروف المد: ا، و، ي",
      description:
        "الجوف هو الخلاء الممتد داخل الفم والحلق، وتخرج منه حروف المد الثلاثة عند تحقق شروط المد.",
      examples: "قَالَ — يَقُولُ — قِيلَ",
    },
    {
      number: 2,
      title: "الحلق",
      letters: "ء، هـ — ع، ح — غ، خ",
      description:
        "ينقسم مخرج الحلق إلى ثلاثة مواضع: أقصى الحلق، ووسط الحلق، وأدنى الحلق.",
      examples:
        "أَنْعَمْتَ — الْحَمْدُ — خَلَقَ",
    },
    {
      number: 3,
      title: "اللسان",
      letters:
        "ق، ك، ج، ش، ي، ض، ل، ن، ر، ط، د، ت، ص، ز، س، ظ، ذ، ث",
      description:
        "يخرج من اللسان عدد كبير من الحروف، وتختلف مخارجها باختلاف موضع اللسان وما يحاذيه من الحنك أو اللثة.",
      examples:
        "قُلْ — جَاءَ — الضَّالِّينَ — الرَّحْمَٰنِ",
    },
    {
      number: 4,
      title: "الشفتان",
      letters: "ف، ب، م، و",
      description:
        "تخرج الفاء من بطن الشفة السفلى مع أطراف الثنايا العليا، وتخرج الباء والميم والواو غير المدية من الشفتين على تفصيل معروف عند أهل التجويد.",
      examples:
        "فَضْل — بِسْمِ — مَالِك — وَهُوَ",
    },
    {
      number: 5,
      title: "الخيشوم",
      letters: "الغنة",
      description:
        "الخيشوم هو أقصى الأنف من الداخل، ويخرج منه صوت الغنة، وتظهر الغنة بوضوح في النون والميم في مواضعها.",
      examples: "إِنَّ — ثُمَّ",
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
            الدرس الثاني
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            مخارج الحروف
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            معرفة مخرج الحرف تساعد على النطق به نطقًا صحيحًا، ولذلك فهي من أهم
            أبواب علم التجويد.
          </p>
        </div>

        <section className="mb-8 rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ما المقصود بمخرج الحرف؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            مخرج الحرف هو الموضع الذي يخرج منه الحرف عند النطق به، بحيث يتميز
            به عن غيره من الحروف. وقد ذكر أهل التجويد أن المخارج العامة خمسة:
            الجوف، والحلق، واللسان، والشفتان، والخيشوم.
          </p>
        </section>

        <div className="space-y-5">
          {makharij.map((makhraj) => (
            <article
              key={makhraj.number}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 font-bold text-emerald-400">
                  {makhraj.number}
                </span>

                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-stone-100">
                    {makhraj.title}
                  </h2>

                  <p className="mt-2 font-serif text-xl text-emerald-300">
                    {makhraj.letters}
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-8 text-stone-300">
                {makhraj.description}
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-stone-950/60 p-5">
                <p className="text-xs text-stone-500">أمثلة</p>

                <p className="mt-3 font-serif text-xl leading-loose text-stone-100">
                  {makhraj.examples}
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ملاحظة</h2>

          <p className="mt-5 leading-8 text-stone-300">
            هذه المخارج الخمسة هي المخارج العامة. أما المخارج الخاصة للحروف
            ففيها تفصيل أكثر، وهو ما سنحتاج إليه عند دراسة كل حرف ومخرجِه
            بالتفصيل.
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
            العودة للدروس
          </Link>
        </div>
      </section>
    </main>
  );
}
