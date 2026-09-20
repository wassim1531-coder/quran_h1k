import Link from "next/link";

export default function QuranLearningPage() {
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
            الدرس الأول
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            مقدمة في التجويد
          </h1>

          <p className="mt-4 text-lg leading-8 text-stone-400">
            مدخل مختصر لفهم التجويد وأهميته في قراءة القرآن الكريم.
          </p>
        </div>

        <article className="space-y-8">
          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-stone-100">
              ما هو التجويد؟
            </h2>

            <p className="mt-5 leading-8 text-stone-300">
              التجويد في اللغة هو التحسين والإتقان. وفي اصطلاح أهل هذا الفن:
              إعطاء الحروف حقها ومستحقها عند تلاوة القرآن الكريم، من مخارج
              وصفات وأحكام.
            </p>

            <p className="mt-4 leading-8 text-stone-300">
              والمقصود أن يقرأ المسلم كلام الله قراءة صحيحة، فينطق الحروف من
              مخارجها، ويراعي الأحكام المتعلقة بها، ويجتهد في تجنب اللحن والخطأ.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-stone-100">
              لماذا نتعلم التجويد؟
            </h2>

            <div className="mt-5 space-y-4 text-stone-300">
              <p className="leading-8">
                لأن القرآن الكريم يُتعبد الله بتلاوته، ومن المهم أن يحرص المسلم
                على قراءته كما ينبغي.
              </p>

              <p className="leading-8">
                ويساعد علم التجويد على تحسين النطق، ومعرفة مواضع المد والإدغام
                والإخفاء وغيرها من الأحكام التي يحتاج إليها القارئ.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.03] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-stone-100">
              الدليل من القرآن
            </h2>

            <div className="mt-6 rounded-2xl border border-white/10 bg-stone-950/60 p-6 text-center">
              <p className="font-serif text-2xl leading-loose text-stone-100 md:text-3xl">
                ﴿وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا﴾
              </p>

              <p className="mt-4 text-sm text-stone-500">
                سورة المزمل، الآية 4
              </p>
            </div>

            <p className="mt-5 leading-8 text-stone-300">
              أمر الله تعالى نبيه ﷺ بترتيل القرآن، والترتيل هو القراءة بتؤدة
              وطمأنينة وبيان، مع إعطاء الحروف حقها.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-stone-100">
              كيف تبدأ؟
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-sm text-emerald-400">01</span>
                <h3 className="mt-2 font-bold">تعلم مخارج الحروف</h3>
                <p className="mt-2 text-sm leading-7 text-stone-400">
                  معرفة موضع خروج كل حرف تساعدك على النطق الصحيح.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-sm text-emerald-400">02</span>
                <h3 className="mt-2 font-bold">تعلم صفات الحروف</h3>
                <p className="mt-2 text-sm leading-7 text-stone-400">
                  مثل الاستعلاء والاستفال والشدة والرخاوة وغيرها.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-sm text-emerald-400">03</span>
                <h3 className="mt-2 font-bold">تعلم الأحكام</h3>
                <p className="mt-2 text-sm leading-7 text-stone-400">
                  مثل أحكام النون الساكنة والتنوين والميم الساكنة والمدود.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-sm text-emerald-400">04</span>
                <h3 className="mt-2 font-bold">التطبيق والاستماع</h3>
                <p className="mt-2 text-sm leading-7 text-stone-400">
                  التطبيق العملي والاستماع إلى القراء المتقنين يساعدان على
                  تحسين التلاوة.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-stone-100">
              تنبيه مهم
            </h2>

            <p className="mt-5 leading-8 text-stone-300">
              علم التجويد واسع، وهذه الصفحة مجرد مقدمة. عند إضافة الأحكام
              التفصيلية إلى الموقع سنحرص على توثيقها من كتب أهل العلم والمصادر
              المعتمدة، وعدم نسبة قول إلى أحد دون التحقق منه.
            </p>
          </section>
        </article>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Link
            href="/learn/quran"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-stone-300 transition hover:border-emerald-400/30 hover:bg-white/5"
          >
            ← جميع الدروس
          </Link>

          <button
            type="button"
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-400"
          >
            الدرس التالي →
          </button>
        </div>
      </section>
    </main>
  );
}
