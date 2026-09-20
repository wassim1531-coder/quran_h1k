"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Question = {
  id: number;
  content: string;
  created_at: string;
  profiles?: {
    username: string;
  }[] | null;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadQuestions() {
    const supabase = createSupabaseBrowserClient();

    const { data, error: fetchError } = await supabase
      .from("community_posts")
      .select(
        `
        id,
        content,
        created_at,
        profiles (
          username
        )
      `
      )
      .order("created_at", { ascending: false })
      .limit(30);

    if (fetchError) {
      setError("تعذر تحميل الأسئلة.");
    } else {
      setQuestions((data as Question[]) ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    const load = async () => {
      await loadQuestions();
    };
    void load();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setError("");
    setSuccess("");

    const supabase = createSupabaseBrowserClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("يجب تسجيل الدخول لطرح سؤال.");
      setSending(false);
      return;
    }

    if (!question.trim()) {
      setError("اكتب سؤالك أولًا.");
      setSending(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("community_posts")
      .insert({
        user_id: user.id,
        content: `[سؤال] ${question.trim()}`,
      });

    if (insertError) {
      setError("تعذر نشر السؤال. حاول مرة أخرى.");
    } else {
      setQuestion("");
      setSuccess("تم نشر سؤالك بنجاح.");
      await loadQuestions();
    }

    setSending(false);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <section className="rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <Link
          href="/community"
          className="text-sm text-emerald-400 transition hover:text-emerald-300"
        >
          ← العودة إلى المجتمع
        </Link>

        <div className="mt-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-950/60 text-2xl">
            ❓
          </div>

          <h1 className="text-3xl font-bold text-white">
            الأسئلة والأجوبة
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            اطرح سؤالك وشارك ما تعرفه مع الآخرين، مع الحرص على التثبت من
            المعلومات الشرعية.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="question"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              سؤالك
            </label>

            <textarea
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="اكتب سؤالك هنا..."
              maxLength={2000}
              rows={6}
              className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
              required
            />

            <p className="mt-2 text-xs text-slate-600">
              {question.length}/2000
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-3 text-sm leading-6 text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 text-sm leading-6 text-emerald-300">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "جاري النشر..." : "نشر السؤال"}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">آخر الأسئلة</h2>
          <p className="mt-2 text-sm text-slate-500">
            لا تعتمد على إجابة شرعية دون التحقق من مصدر موثوق.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center text-slate-500">
            جاري تحميل الأسئلة...
          </div>
        ) : error && questions.length === 0 ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6 text-center text-red-300">
            تعذر تحميل الأسئلة.
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center text-slate-500">
            لا توجد أسئلة حتى الآن.
          </div>
        ) : (
          questions.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-medium text-emerald-400">
                  {item.profiles?.[0]?.username ?? "مستخدم"}
                </span>

                <time
                  dateTime={item.created_at}
                  className="text-xs text-slate-600"
                >
                  {new Date(item.created_at).toLocaleDateString("ar-MA")}
                </time>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-8 text-slate-300">
                {item.content}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}