"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function FeedbackPage() {
  const [type, setType] = useState("اقتراح");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const supabase = createSupabaseBrowserClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("يجب تسجيل الدخول لإرسال ملاحظة أو اقتراح.");
      setLoading(false);
      return;
    }

    if (!message.trim()) {
      setError("اكتب ملاحظتك أولًا.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("community_posts")
      .insert({
        user_id: user.id,
        content: `[${type}] ${message.trim()}`,
      });

    if (insertError) {
      setError("تعذر إرسال الملاحظة. حاول مرة أخرى.");
    } else {
      setMessage("");
      setSuccess("تم إرسال ملاحظتك بنجاح، جزاك الله خيرًا.");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <section className="rounded-3xl border border-emerald-500/20 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <Link
          href="/community"
          className="text-sm text-emerald-400 transition hover:text-emerald-300"
        >
          ← العودة إلى المجتمع
        </Link>

        <div className="mt-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-950/60 text-2xl">
            📝
          </div>

          <h1 className="text-3xl font-bold text-white">
            ملاحظات واقتراحات
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            أخبرنا عن خطأ وجدته، أو اقترح فكرة يمكن أن تجعل quran_h1k أفضل.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              نوع الرسالة
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["اقتراح", "خطأ", "ملاحظة"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    type === item
                      ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                      : "border-slate-700 bg-slate-950/50 text-slate-400 hover:border-emerald-500/40 hover:text-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              رسالتك
            </label>

            <textarea
              id="feedback"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="اكتب ملاحظتك أو اقتراحك هنا..."
              maxLength={2000}
              rows={7}
              className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
              required
            />

            <p className="mt-2 text-xs text-slate-600">
              {message.length}/2000
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
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "جاري الإرسال..." : "إرسال الملاحظة"}
          </button>
        </form>
      </section>
    </div>
  );
}