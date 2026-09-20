"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const supabase = createSupabaseBrowserClient();

    if (mode === "signup") {
      if (!username.trim()) {
        setError("اكتب اسم المستخدم.");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage(
          "تم إنشاء الحساب. تحقق من بريدك الإلكتروني إذا طلب منك ذلك."
        );
      }
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else {
        router.push("/community");
      }
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center py-10">
      <div className="w-full rounded-3xl border border-emerald-500/20 bg-slate-900/85 p-6 shadow-2xl backdrop-blur-xl md:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/60 text-3xl">
            👤
          </div>

          <h1 className="text-2xl font-bold text-white">
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {mode === "login"
              ? "سجّل الدخول للمشاركة في مجتمع quran_h1k."
              : "أنشئ حسابًا للمشاركة والتفاعل مع أفراد المجتمع."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                اسم المستخدم
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="مثال: Abdullah"
                maxLength={30}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              كلمة المرور
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-3 text-sm leading-6 text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-4 py-3 text-sm leading-6 text-emerald-300">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "جاري المعالجة..."
              : mode === "login"
                ? "تسجيل الدخول"
                : "إنشاء الحساب"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          {mode === "login" ? (
            <>
              ليس لديك حساب؟{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setMessage("");
                }}
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                إنشاء حساب
              </button>
            </>
          ) : (
            <>
              لديك حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setMessage("");
                }}
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                تسجيل الدخول
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/community"
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            العودة إلى المجتمع
          </Link>
        </div>
      </div>
    </div>
  );
}