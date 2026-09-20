"use client";

import Link from "next/link";

export default function HadithTypes() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn/hadith" className="mb-8 inline-block text-emerald-700">
          ← تعليم الحديث
        </Link>

        <h1 className="mb-4 text-4xl font-bold">الدرس الثاني: أقسام الحديث</h1>

        <p className="mb-8 text-lg leading-8 text-stone-600">
          من أهم ما يحتاجه طالب العلم معرفة المصطلحات الأساسية التي يستعملها
          المحدثون في الحكم على الروايات.
        </p>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">الحديث الصحيح</h2>
            <p className="leading-8">
              هو ما اتصل سنده بنقل العدل الضابط عن مثله من أول السند إلى منتهاه،
              من غير شذوذ ولا علة قادحة.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">الحديث الحسن</h2>
            <p className="leading-8">
              هو حديث مقبول، وتتوافر فيه شروط الصحة مع كون ضبط بعض رواته أخف
              من ضبط رواة الحديث الصحيح.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">الحديث الضعيف</h2>
            <p className="leading-8">
              هو الحديث الذي لم يجمع شروط الحديث الصحيح أو الحسن، وتختلف أسباب
              الضعف بحسب الرواية.
            </p>
          </div>

          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">الحديث الموضوع</h2>
            <p className="leading-8">
              هو الحديث المختلق المكذوب المنسوب إلى النبي ﷺ، ولا يجوز نسبته
              إليه على أنه حديث ثابت.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">ملاحظة مهمة</h2>
            <p className="leading-8">
              هذه تقسيمات مختصرة للتعلم. والحكم على حديث معين يحتاج إلى الرجوع
              إلى كلام أهل الحديث ومصادر التخريج، ولا يكفي الاعتماد على شهرة
              الحديث أو وجوده في موقع غير موثوق.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
