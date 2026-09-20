"use client";

import { use } from "react";
import Link from "next/link";

interface TopicData {
  title: string;
  sections: { title: string; content: string }[];
}

const lessonsData: { [key: string]: TopicData } = {
  noon: {
    title: "أحكام النون الساكنة والتنوين",
    sections: [
      {
        title: "1. الإظهار الحلقي",
        content: "إخراج الحرف من مخرجه بدون غنة زائدة، وذلك إذا وقع بعد النون الساكنة أو التنوين أحد أحكام الحلق الستة: (أ، هـ، ع، ح، غ، خ).",
      },
      {
        title: "2. الإدغام",
        content: "دمج النون الساكنة أو التنوين بالحرف التالي بحيث يصيران حرفاً واحداً مشدداً، وحروفه مجموعة في كلمة (يرملون). وينقسم إلى بغنة (ينمو) وبغير غنة (ر، ل).",
      },
      {
        title: "3. الإقلاب",
        content: "قلب النون الساكنة أو التنوين ميماً مخفاة بغنة عند ملاقاة حرف الباء (ب).",
      },
      {
        title: "4. الإخفاء الحقيقي",
        content: "نطق النون الساكنة أو التنوين بحالة بين الإظهار والإدغام مع بقاء الغنة عند الحروف الـ 15 المتبقية.",
      },
    ],
  },
  makharij: {
    title: "مخارج الحروف",
    sections: [
      {
        title: "المخارج العامة الخمسة",
        content: "1. الجوف (حروف المد الثلاثة)\n2. الحلق (أقصى، وسط، أدنى)\n3. اللسان (18 حرفاً)\n4. الشفتان (ف، ب، م، و)\n5. الخيشوم (صوت الغنة).",
      },
    ],
  },
};

export default function TajweedTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const resolvedParams = use(params);
  const topicKey = resolvedParams.topic;
  const lesson = lessonsData[topicKey] || lessonsData["noon"];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-900/30">
        <Link href="/learn/quran" className="text-xs text-emerald-400 hover:underline mb-2 inline-block">
          ← دروس التجويد
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-400">{lesson.title}</h1>
      </div>

      <div className="space-y-6">
        {lesson.sections.map((sec, index) => (
          <div key={index} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-emerald-300">{sec.title}</h2>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line dir-rtl">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
