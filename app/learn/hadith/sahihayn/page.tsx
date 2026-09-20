"use client";

import Link from "next/link";

export default function SahihaynLesson() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn/hadith" className="mb-8 inline-block text-emerald-700">
          ← تعليم الحديث
        </Link>

        <h1 className="mb-4 text-4xl font-bold">الدرس الثالث: الصحيحان</h1>

        <p className="mb-8 text-lg leading-8 text-stone-600">
          يُطلق اسم الصحيحين على كتابي الإمام البخاري والإمام مسلم رحمهما الله،
          وهما من أشهر كتب الحديث وأعلاها مكانة عند أهل السنة.
        </p>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">صحيح البخاري</h2>
            <p className="leading-8">
              مؤلفه الإمام محمد بن إسماعيل البخاري رحمه الله، واسم كتابه
              «الجامع المسند الصحيح المختصر من أمور رسول الله ﷺ وسننه وأيامه».
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">صحيح مسلم</h2>
            <p className="leading-8">
              مؤلفه الإمام مسلم بن الحجاج رحمه الله، وهو من كبار أئمة الحديث،
              وكتابه من أصح كتب الحديث.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">ما المقصود بالصحيحين؟</h2>
            <p className="leading-8">
              المقصود بالصحيحين: صحيح البخاري وصحيح مسلم معًا. وقد اعتنى
              الإمَامان بانتقاء الأحاديث وفق شروطهما ومنهجهما في التصنيف.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">تنبيه</h2>
            <p className="leading-8">
              لا يعني هذا أن كل كتاب حديث آخر ضعيف، ولا يعني أن كل رواية خارج
              الصحيحين ضعيفة. الحكم على الحديث يكون بالنظر في سنده ومتنه وأقوال
              أهل الحديث، مع مراعاة اختلاف مناهج المصنفين.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
