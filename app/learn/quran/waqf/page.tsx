import Link from "next/link";

export default function WaqfPage() {
  const signs = [
    {
      sign: "م",
      title: "الوقف اللازم",
      description:
        "علامة تدل على أن الوقف أولى أو متعين من جهة المعنى، لأن الوصل قد يوهم معنى غير المراد.",
    },
    {
      sign: "لا",
      title: "لا تقف",
      description:
        "علامة تدل على أن الوقف في هذا الموضع غير مناسب من جهة المعنى، ويستحسن وصل الكلام بما بعده.",
    },
    {
      sign: "ج",
      title: "الوقف الجائز",
      description:
        "يجوز الوقف والوصل، بحسب تمام المعنى وحال القارئ.",
    },
    {
      sign: "قلى",
      title: "الوقف أولى",
      description:
        "علامة تدل على أن الوقف أولى من الوصل في ذلك الموضع.",
    },
    {
      sign: "صلى",
      title: "الوصل أولى",
      description:
        "علامة تدل على أن الوصل أولى من الوقف، مع بقاء جواز الوقف من حيث الأصل.",
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
            الدرس السابع
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            الوقف والابتداء
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            من أهم مهارات تلاوة القرآن معرفة المواضع التي يحسن فيها الوقف،
            والمواضع التي يحسن فيها الابتداء.
          </p>
        </div>

        <section className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">ما هو الوقف؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            الوقف هو قطع الصوت على الكلمة القرآنية زمنًا يتنفس فيه القارئ عادةً،
            مع نية استئناف القراءة.
          </p>

          <h2 className="mt-8 text-2xl font-bold">ما هو الابتداء؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            الابتداء هو الشروع في القراءة بعد الوقف، وينبغي أن يكون من موضع يصح
            معه المعنى ولا يوقع في إيهام أو إخلال.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-2xl font-bold">لماذا نهتم بالوقف؟</h2>

          <p className="mt-5 leading-8 text-stone-300">
            لأن الوقف يتعلق بالمعنى. فقد يكون الوقف على كلمة تامة المعنى حسنًا،
            وقد يؤدي الوقف في موضع آخر إلى فصل كلام متعلق بعضه ببعض.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-stone-950/60 p-5">
            <p className="font-serif text-xl leading-loose text-stone-100">
              ﴿وَلَا تَقْرَبُوا الصَّلَاةَ وَأَنْتُمْ سُكَارَىٰ﴾
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-500">
              المثال يوضح أهمية فهم السياق وعدم اقتطاع الكلام بما يغير أو يوهم
              معنى الآية.
            </p>
          </div>
        </section>

        <div className="mt-6 space-y-5">
          {signs.map((item) => (
            <article
              key={item.sign}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 font-serif text-2xl font-bold text-emerald-300">
                  {item.sign}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-stone-100">
                    {item.title}
                  </h2>

                  <p className="mt-3 leading-8 text-stone-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
          <h2 className="text-2xl font-bold">قاعدة مهمة للمبتدئ</h2>

          <p className="mt-5 leading-8 text-stone-300">
            لا تعتمد على علامة واحدة بمعزل عن فهم المعنى. علامات الوقف في
            المصاحف لها اصطلاحات معروفة، وقد تختلف بعض العلامات والتفاصيل بين
            طبعات المصاحف.
          </p>

          <p className="mt-4 leading-8 text-stone-300">
            وإذا اضطر القارئ إلى الوقف بسبب انقطاع النفس، فليحرص عند استئناف
            القراءة على اختيار موضع مناسب، وقد يحتاج إلى الرجوع قليلًا قبل
            الموضع الذي وقف فيه حتى يكتمل المعنى.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
          <h2 className="text-2xl font-bold">تطبيق</h2>

          <p className="mt-5 leading-8 text-stone-300">
            أثناء قراءتك للمصحف، حاول ملاحظة علامات الوقف، ثم استمع إلى قارئ
            متقن ولاحظ أين يقف وكيف يبدأ من جديد. الجمع بين النظر والاستماع
            والتطبيق يساعد على تثبيت هذا الباب.
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
