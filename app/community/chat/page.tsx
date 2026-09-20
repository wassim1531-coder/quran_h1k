"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createClient, type RealtimeChannel } from "@supabase/supabase-js";
import Link from "next/link";

type Message = {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    username: string;
  }[] | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function CommunityChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let channel: RealtimeChannel | null = null;

    async function initializeChat() {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!active) return;

      if (userError || !user) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

      if (!active) return;

      if (profileError) {
        setError("تعذر تحميل ملف المستخدم.");
      } else if (profile) {
        setUsername(profile.username);
      }

      const { data, error: messagesError } = await supabase
        .from("messages")
        .select(
          `
          id,
          user_id,
          content,
          created_at,
          profiles (
            username
          )
        `
        )
        .order("created_at", { ascending: true });

      if (!active) return;

      if (messagesError) {
        setError("تعذر تحميل الرسائل.");
      } else {
        setMessages((data as Message[]) || []);
      }

      const realtimeChannel = supabase
        .channel(`community-messages-${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
          },
          async (payload) => {
            if (!active) return;

            const newMessage = payload.new as Message;
            const { data: messageProfile } = await supabase
              .from("profiles")
              .select("username")
              .eq("id", newMessage.user_id)
              .single();

            if (!active) return;

            setMessages((current) => {
              if (current.some((message) => message.id === newMessage.id)) {
                return current;
              }

              return [
                ...current,
                {
                  ...newMessage,
                  profiles: messageProfile ? [messageProfile] : null,
                },
              ];
            });
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "messages",
          },
          (payload) => {
            if (!active) return;

            setMessages((current) =>
              current.filter((message) => message.id !== payload.old.id)
            );
          }
        );

      if (!active) {
        await supabase.removeChannel(realtimeChannel);
        return;
      }

      channel = realtimeChannel;
      realtimeChannel.subscribe();
      setLoading(false);
    }

    initializeChat();

    return () => {
      active = false;

      if (channel) {
        const currentChannel = channel;
        channel = null;
        void supabase.removeChannel(currentChannel);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = content.trim();

    if (!text || !userId || sending) {
      return;
    }

    setSending(true);
    setError("");

    const { error: insertError } = await supabase.from("messages").insert({
      user_id: userId,
      content: text,
    });

    if (insertError) {
      setError("تعذر إرسال الرسالة.");
    } else {
      setContent("");
    }

    setSending(false);
  }

  async function deleteMessage(messageId: number) {
    if (!userId) {
      return;
    }

    const { error: deleteError } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId)
      .eq("user_id", userId);

    if (deleteError) {
      setError("تعذر حذف الرسالة.");
    }
  }

  function formatTime(date: string) {
    return new Intl.DateTimeFormat("ar-MA", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  if (!userId) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center py-10">
        <div className="w-full rounded-3xl border border-emerald-500/20 bg-slate-900/85 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/60 text-3xl">
            🔒
          </div>

          <h1 className="text-2xl font-bold text-white">
            سجّل الدخول للمشاركة
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            يجب تسجيل الدخول حتى تتمكن من المشاركة في المحادثة العامة.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-500"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <Link
            href="/community"
            className="text-sm text-emerald-400 transition hover:text-emerald-300"
          >
            ← العودة إلى المجتمع
          </Link>

          <h1 className="mt-3 text-3xl font-bold text-white">
            💬 المحادثة العامة
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            مرحبًا {username || "بك"}، شارك وتفاعل مع أفراد المجتمع باحترام.
          </p>
        </div>

        <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/30 px-4 py-3 text-center sm:block">
          <div className="text-xs text-slate-500">الأعضاء</div>
          <div className="mt-1 font-bold text-emerald-400">
            مجتمع quran_h1k
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/85 shadow-2xl backdrop-blur-xl">
        <div className="border-b border-slate-800 bg-slate-950/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/70 text-xl">
              🌙
            </div>

            <div>
              <div className="font-bold text-white">المجتمع العام</div>
              <div className="text-xs text-emerald-400">
                محادثة مباشرة
              </div>
            </div>
          </div>
        </div>

        <div className="h-[55vh] min-h-[420px] overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex h-full items-center justify-center text-slate-400">
              جاري تحميل المحادثة...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 text-5xl">💬</div>

              <h2 className="text-lg font-bold text-white">
                لا توجد رسائل بعد
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                كن أول من يبدأ المحادثة.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isMine = message.user_id === userId;
                const messageUsername =
                  message.profiles?.[0]?.username || "عضو";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isMine ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] ${
                        isMine ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`mb-1 flex items-center gap-2 text-xs ${
                          isMine ? "justify-start" : "justify-end"
                        }`}
                      >
                        <span className="font-semibold text-emerald-400">
                          {isMine ? "أنت" : messageUsername}
                        </span>

                        <span className="text-slate-600">
                          {formatTime(message.created_at)}
                        </span>
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 leading-7 ${
                          isMine
                            ? "rounded-tr-md bg-emerald-700 text-white"
                            : "rounded-tl-md border border-slate-700 bg-slate-800 text-slate-100"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>

                      {isMine && (
                        <button
                          type="button"
                          onClick={() => deleteMessage(message.id)}
                          className="mt-1 text-xs text-slate-600 transition hover:text-red-400"
                        >
                          حذف
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {error && (
          <div className="border-t border-red-500/20 bg-red-950/20 px-5 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={sendMessage}
          className="border-t border-slate-800 bg-slate-950/50 p-4"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="اكتب رسالتك..."
              maxLength={1000}
              disabled={sending}
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!content.trim() || sending}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? "..." : "إرسال"}
            </button>
          </div>

          <div className="mt-2 text-xs text-slate-600">
            {content.length}/1000
          </div>
        </form>
      </div>
    </div>
  );
}