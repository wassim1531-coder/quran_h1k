"use client";

import Link from "next/link";

export default function HadithVerification() {
  return (
    <main dir="rtl" className="min-h-screen bg-stone-50 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/learn/hadith" className="mb-8 inline-block text-emerald-700">
          ← تعليم الحديث
        </Link>

        <h1 className="mb-4 text-4xl font-bold">
          الدرس الرابع: كيف نتحقق من الحديث؟
        </h1>

        <p className="mb-8 text-lg leading-8 text-stone-600">
          قبل نشر حديث أو الاستدلال به، من المهم التأكد من نصه ومصدره ودرجته.
        </p>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">خطوات التحقق</h2>

            <ol className="space-y-5 pr-6 leading-8">
              <li>
                <strong>1. تحقق من نص الحديث:</strong>
                <br />
                لا تعتمد على صورة أو منشور مجهول المصدر، فقد يكون النص ناقصًا
                أو محرّفًا.
              </li>

              <li>
                <strong>2. ابحث عن المصدر:</strong>
                <br />
                حاول معرفة الكتاب الذي ورد فيه الحديث، واسم الصحابي الراوي
                ورقم الحديث إن توفر.
              </li>

              <li>
                <strong>3. تحقق من درجة الحديث:</strong>
                <br />
                انظر في حكم أهل الحديث عليه، ولا تكتفِ بعبارات مثل «رواه
                العلماء» أو «حديث مشهور».
              </li>

              <li>
                <strong>4. ميّز بين التخريج والحكم:</strong>
                <br />
                وجود الحديث في كتاب لا يعني بالضرورة أن مؤلف ذلك الكتاب حكم
                عليه بالصحة، ولذلك ينبغي فهم منهج الكتاب.
              </li>

              <li>
                <strong>5. عند الشك، لا تنسبه إلى النبي ﷺ:</strong>
                <br />
                إذا لم تتأكد من ثبوت الحديث، يمكنك ترك نشره حتى تتحقق منه.
              </li>
            </ol>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">مثال عملي</h2>
            <p className="leading-8">
              وجدت حديثًا منتشرًا على مواقع التواصل. بدلًا من نشره مباشرة،
              ابحث عن جزء مميز من نصه، ثم حاول الوصول إلى مصدره، وبعد ذلك
              تحقق من درجة الحديث وكلام أهل الاختصاص فيه.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="mb-3 text-2xl font-bold">قاعدة مهمة</h2>
            <p className="text-xl font-bold leading-9">
              الشهرة ليست دليلًا على صحة الحديث.
            </p>
            <p className="mt-3 leading-8">
              وكذلك وجود الحديث في أحد المواقع الإلكترونية لا يكفي وحده
              للحكم عليه.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">في موقعنا</h2>
            <p className="leading-8">
              عند إضافة الأحاديث إلى الموقع سنحاول عرض المصدر ودرجة الحديث
              والمعلومات اللازمة بوضوح، مع تجنب نسبة ما لم يثبت إلى النبي ﷺ.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
