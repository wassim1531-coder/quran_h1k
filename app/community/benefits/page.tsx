"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type Post = {
  id: number;
  content: string;
  created_at: string;
  profiles?: {
    username: string;
  }[] | null;
};

export default function BenefitsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadPosts() {
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
      setError("تعذر تحميل المشاركات.");
    } else {
      setPosts((data as Post[]) ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    const load = async () => {
      await loadPosts();
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
      setError("يجب تسجيل الدخول لمشاركة فائدة.");
      setSending(false);
      return;
    }

    if (!message.trim()) {
      setError("اكتب الفائدة أولًا.");
      setSending(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("community_posts")
      .insert({
        user_id: user.id,
        content: `[فائدة] ${message.trim()}`,
      });

    if (insertError) {
      setError("تعذر نشر الفائدة. حاول مرة أخرى.");
    } else {
      setMessage("");
      setSuccess("تم نشر الفائدة بنجاح.");
      await loadPosts();
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
            📚
          </div>

          <h1 className="text-3xl font-bold text-white">
            الفوائد والمشاركات
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            شارك فائدة قرآنية أو حديثًا موثقًا أو فائدة نافعة في التجويد.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="benefit"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              الفائدة
            </label>

            <textarea
              id="benefit"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="اكتب الفائدة مع مصدرها إن أمكن..."
              maxLength={3000}
              rows={6}
              className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500"
              required
            />

            <p className="mt-2 text-xs text-slate-600">
              {message.length}/3000
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
            {sending ? "جاري النشر..." : "نشر الفائدة"}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">آخر المشاركات</h2>
          <p className="mt-2 text-sm text-slate-500">
            تحقق من مصدر المعلومة قبل الاعتماد عليها أو نشرها.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center text-slate-500">
            جاري تحميل المشاركات...
          </div>
        ) : error && posts.length === 0 ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6 text-center text-red-300">
            تعذر تحميل المشاركات.
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center text-slate-500">
            لا توجد مشاركات حتى الآن.
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-medium text-emerald-400">
                  {post.profiles?.[0]?.username ?? "مستخدم"}
                </span>

                <time
                  dateTime={post.created_at}
                  className="text-xs text-slate-600"
                >
                  {new Date(post.created_at).toLocaleDateString("ar-MA")}
                </time>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-8 text-slate-300">
                {post.content}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}