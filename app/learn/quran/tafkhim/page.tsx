"use client";

import Link from "next/link";

export default function TafkhimLesson() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn/quran" className="mb-8 inline-block text-emerald-700">
          ← تعليم القرآن
        </Link>

        <h1 className="mb-4 text-4xl font-bold">الدرس الثامن: التفخيم والترقيق</h1>

        <p className="mb-8 text-lg leading-8 text-stone-600">
          التفخيم هو تسمين صوت الحرف وامتلاء الفم بصداه، والترقيق هو تنحيف
          صوت الحرف وعدم امتلاء الفم بصداه.
        </p>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">حروف الاستعلاء</h2>
            <p className="text-center text-3xl font-bold tracking-widest">
              خُصَّ ضَغْطٍ قِظْ
            </p>
            <p className="mt-4 leading-8 text-stone-600">
              هذه الحروف مفخمة في الأصل، مع وجود تفاصيل وأحكام تختلف بحسب
              الحركة والسياق.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">الراء</h2>
            <p className="leading-8">
              للراء أحكام في التفخيم والترقيق، ويختلف حكمها بحسب حركتها وما
              قبلها وما بعدها في بعض المواضع.
            </p>
            <div className="mt-4 rounded-xl bg-white p-4">
              <p className="font-semibold">أمثلة:</p>
              <p className="mt-2 leading-8">
                رَحْمَةٌ — رِزْقٌ — الْقَمَرِ
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">لام لفظ الجلالة</h2>
            <p className="leading-8">
              تفخم لام لفظ الجلالة إذا سبقها فتح أو ضم، وترقق إذا سبقها كسر.
            </p>
            <div className="mt-4 rounded-xl bg-stone-100 p-4 leading-8">
              <p>تفخيم: قَالَ اللَّهُ — عَبْدُ اللَّهِ</p>
              <p>ترقيق: بِسْمِ اللَّهِ</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">ملاحظة</h2>
            <p className="leading-8 text-stone-600">
              هذا الدرس مقدمة مختصرة، وبعض أحكام التفخيم والترقيق لها تفاصيل
              دقيقة، لذلك ينبغي تعلمها من مصدر تجويد موثوق مع التطبيق على
              قراءة القرآن.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
