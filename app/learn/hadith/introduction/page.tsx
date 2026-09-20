"use client";

import Link from "next/link";

export default function HadithIntroduction() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn/hadith" className="mb-8 inline-block text-emerald-700">
          ← تعليم الحديث
        </Link>

        <h1 className="mb-4 text-4xl font-bold">الدرس الأول: مقدمة في علم الحديث</h1>

        <p className="mb-8 text-lg leading-8 text-stone-600">
          علم الحديث من العلوم التي تعين على معرفة ما ثبت عن رسول الله ﷺ،
          وتمييز الروايات من حيث القبول والرد.
        </p>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">ما هو الحديث؟</h2>
            <p className="leading-8">
              الحديث في اصطلاح المحدثين ما أضيف إلى النبي ﷺ من قول أو فعل أو
              تقرير أو صفة.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">لماذا نتحقق من الحديث؟</h2>
            <p className="leading-8">
              لأن نسبة كلام إلى النبي ﷺ أمر عظيم، فلا ينبغي نشر حديث أو
              الاستدلال به قبل معرفة درجته ومصدره قدر الإمكان.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">مصطلحات أساسية</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold">الحديث الصحيح</h3>
                <p className="leading-8 text-stone-600">
                  حديث توفرت فيه شروط الصحة عند أهل الحديث، ومنها اتصال السند
                  وعدالة الرواة وضبطهم وانتفاء الشذوذ والعلة القادحة.
                </p>
              </div>

              <div>
                <h3 className="font-bold">الحديث الضعيف</h3>
                <p className="leading-8 text-stone-600">
                  هو الحديث الذي لم تتوفر فيه شروط الحديث المقبول.
                </p>
              </div>

              <div>
                <h3 className="font-bold">السند والمتن</h3>
                <p className="leading-8 text-stone-600">
                  السند هو سلسلة الرواة الذين نقلوا الحديث، والمتن هو نص
                  الحديث الذي انتهى إليه السند.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">تنبيه</h2>
            <p className="leading-8">
              لا يكفي أن يكون الحديث مشهورًا على مواقع التواصل للحكم بصحته.
              في الموقع سنحرص على ذكر المصدر ودرجة الحديث عند توفرها، مع
              التفريق بوضوح بين الصحيح والضعيف وما يحتاج إلى مزيد من التحقق.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
