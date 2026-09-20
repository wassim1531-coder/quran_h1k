"use client";

import Link from "next/link";

const lessons = [
  {
    title: "الدرس الأول: مقدمة في علم الحديث",
    href: "/learn/hadith/introduction",
    text: "ما هو الحديث؟ وما الفرق بين الحديث الصحيح والضعيف؟",
  },
  {
    title: "الدرس الثاني: أقسام الحديث",
    href: "/learn/hadith/types",
    text: "الصحيح والحسن والضعيف والموضوع بصورة مبسطة.",
  },
  {
    title: "الدرس الثالث: الصحيحان",
    href: "/learn/hadith/sahihayn",
    text: "التعريف بصحيح البخاري وصحيح مسلم ومكانتهما.",
  },
  {
    title: "الدرس الرابع: كيف نتحقق من الحديث؟",
    href: "/learn/hadith/verification",
    text: "خطوات عملية قبل نشر أو الاستدلال بأي حديث.",
  },
];

export default function HadithLearning() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-8 inline-block text-emerald-700">
          ← الرئيسية
        </Link>

        <h1 className="mb-3 text-4xl font-bold">تعليم الحديث</h1>
        <p className="mb-8 text-lg leading-8 text-stone-600">
          دروس مبسطة للتعرف على علم الحديث ومصطلحاته وكيفية التثبت من الأحاديث.
        </p>

        <div className="grid gap-5">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="block rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 text-sm font-semibold text-emerald-700">
                الدرس {index + 1}
              </div>
              <h2 className="mb-2 text-2xl font-bold">{lesson.title}</h2>
              <p className="leading-8 text-stone-600">{lesson.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
