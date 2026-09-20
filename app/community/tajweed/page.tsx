"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type Profile = {
  username: string;
};

type Submission = {
  id: number;
  user_id: string;
  audio_url: string;
  audio_src?: string;
  file_name: string;
  surah_number: number | null;
  ayah_from: number | null;
  ayah_to: number | null;
  riwaya: string;
  notes: string | null;
  status: "pending" | "reviewed" | "approved" | "rejected";
  created_at: string;
  profiles?: Profile[] | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const surahs = [
  "الفاتحة",
  "البقرة",
  "آل عمران",
  "النساء",
  "المائدة",
  "الأنعام",
  "الأعراف",
  "الأنفال",
  "التوبة",
  "يونس",
  "هود",
  "يوسف",
  "الرعد",
  "إبراهيم",
  "الحجر",
  "النحل",
  "الإسراء",
  "الكهف",
  "مريم",
  "طه",
  "الأنبياء",
  "الحج",
  "المؤمنون",
  "النور",
  "الفرقان",
  "الشعراء",
  "النمل",
  "القصص",
  "العنكبوت",
  "الروم",
  "لقمان",
  "السجدة",
  "الأحزاب",
  "سبأ",
  "فاطر",
  "يس",
  "الصافات",
  "ص",
  "الزمر",
  "غافر",
  "فصلت",
  "الشورى",
  "الزخرف",
  "الدخان",
  "الجاثية",
  "الأحقاف",
  "محمد",
  "الفتح",
  "الحجرات",
  "ق",
  "الذاريات",
  "الطور",
  "النجم",
  "القمر",
  "الرحمن",
  "الواقعة",
  "الحديد",
  "المجادلة",
  "الحشر",
  "الممتحنة",
  "الصف",
  "الجمعة",
  "المنافقون",
  "التغابن",
  "الطلاق",
  "التحريم",
  "الملك",
  "القلم",
  "الحاقة",
  "المعارج",
  "نوح",
  "الجن",
  "المزمل",
  "المدثر",
  "القيامة",
  "الإنسان",
  "المرسلات",
  "النبأ",
  "النازعات",
  "عبس",
  "التكوير",
  "الانفطار",
  "المطففين",
  "الانشقاق",
  "البروج",
  "الطارق",
  "الأعلى",
  "الغاشية",
  "الفجر",
  "البلد",
  "الشمس",
  "الليل",
  "الضحى",
  "الشرح",
  "التين",
  "العلق",
  "القدر",
  "البينة",
  "الزلزلة",
  "العاديات",
  "القارعة",
  "التكاثر",
  "العصر",
  "الهمزة",
  "الفيل",
  "قريش",
  "الماعون",
  "الكوثر",
  "الكافرون",
  "النصر",
  "المسد",
  "الإخلاص",
  "الفلق",
  "الناس",
];

export default function TajweedPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [surahNumber, setSurahNumber] = useState("");
  const [ayahFrom, setAyahFrom] = useState("");
  const [ayahTo, setAyahTo] = useState("");
  const [riwaya, setRiwaya] = useState("حفص عن عاصم");
  const [notes, setNotes] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUserId(null);
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (profile) {
      setUsername(profile.username);
    }

    const { data, error: submissionsError } = await supabase
      .from("tajweed_submissions")
      .select(
        `
        id,
        user_id,
        audio_url,
        file_name,
        surah_number,
        ayah_from,
        ayah_to,
        riwaya,
        notes,
        status,
        created_at,
        profiles (
          username
        )
      `
      )
      .order("created_at", { ascending: false })
      .limit(30);

    if (submissionsError) {
      setError("تعذر تحميل التسجيلات.");
    } else {
      const rows = (data as Submission[]) || [];

      const rowsWithUrls = await Promise.all(
        rows.map(async (submission) => {
          const { data: signedData } = await supabase.storage
            .from("tajweed-audio")
            .createSignedUrl(submission.audio_url, 60 * 60);

          return {
            ...submission,
            audio_src: signedData?.signedUrl || "",
          };
        })
      );

      setSubmissions(rowsWithUrls);
    }

    setLoading(false);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;

    setError("");
    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!selectedFile.type.startsWith("audio/")) {
      setError("اختر ملفًا صوتيًا فقط.");
      event.target.value = "";
      setFile(null);
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setError("حجم التسجيل يجب ألا يتجاوز 15 ميغابايت.");
      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!userId) {
      setError("يجب تسجيل الدخول أولًا.");
      return;
    }

    if (!file) {
      setError("اختر تسجيلًا صوتيًا.");
      return;
    }

    if (!surahNumber) {
      setError("اختر السورة.");
      return;
    }

    setUploading(true);

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "audio";

    const filePath = `${userId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("tajweed-audio")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      setError("تعذر رفع التسجيل الصوتي.");
      setUploading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("tajweed_submissions")
      .insert({
        user_id: userId,
        audio_url: filePath,
        file_name: file.name,
        surah_number: Number(surahNumber),
        ayah_from: ayahFrom ? Number(ayahFrom) : null,
        ayah_to: ayahTo ? Number(ayahTo) : null,
        riwaya,
        notes: notes.trim() || null,
      });

    if (insertError) {
      await supabase.storage.from("tajweed-audio").remove([filePath]);
      setError("تم رفع الملف لكن تعذر حفظ بيانات التسجيل.");
      setUploading(false);
      return;
    }

    setFile(null);
    setSurahNumber("");
    setAyahFrom("");
    setAyahTo("");
    setNotes("");
    setMessage("تم إرسال تسجيلك بنجاح للمراجعة.");

    const fileInput = document.getElementById(
      "tajweed-audio"
    ) as HTMLInputElement | null;

    if (fileInput) {
      fileInput.value = "";
    }

    await loadPage();

    setUploading(false);
  }

  function statusLabel(status: Submission["status"]) {
    if (status === "approved") return "مقبول";
    if (status === "rejected") return "مرفوض";
    if (status === "reviewed") return "تمت مراجعته";
    return "قيد المراجعة";
  }

  function statusClass(status: Submission["status"]) {
    if (status === "approved") {
      return "border-emerald-500/20 bg-emerald-950/30 text-emerald-300";
    }

    if (status === "rejected") {
      return "border-red-500/20 bg-red-950/30 text-red-300";
    }

    if (status === "reviewed") {
      return "border-blue-500/20 bg-blue-950/30 text-blue-300";
    }

    return "border-amber-500/20 bg-amber-950/30 text-amber-300";
  }

  function getSurahName(number: number | null) {
    if (!number || number < 1 || number > 114) {
      return "غير محددة";
    }

    return surahs[number - 1];
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="text-slate-400">جاري التحميل...</div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center py-10">
        <div className="w-full rounded-3xl border border-emerald-500/20 bg-slate-900/85 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/60 text-3xl">
            🎙️
          </div>

          <h1 className="text-2xl font-bold text-white">
            تسجيلات التجويد
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            سجّل تلاوتك وأرسلها للمراجعة والاستفادة من ملاحظات أهل العلم
            والمختصين.
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
    <div className="mx-auto max-w-5xl py-6">
      <div className="mb-6">
        <Link
          href="/community"
          className="text-sm text-emerald-400 transition hover:text-emerald-300"
        >
          ← العودة إلى المجتمع
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-white">
          🎙️ تسجيلات التجويد
        </h1>

        <p className="mt-2 max-w-3xl leading-7 text-slate-400">
          مرحبًا {username || "بك"}. أرسل تسجيلًا قصيرًا لتلاوتك، ويمكنك تحديد
          السورة والآيات والرواية حتى تكون المراجعة أوضح.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/85 p-5 shadow-2xl backdrop-blur-xl md:p-7">
          <h2 className="text-xl font-bold text-white">
            إرسال تسجيل جديد
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            الحد الأقصى للتسجيل 15 ميغابايت. استخدم تسجيلًا واضحًا وقصيرًا.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="tajweed-audio"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                التسجيل الصوتي
              </label>

              <input
                id="tajweed-audio"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950/70 text-sm text-slate-300 file:mr-4 file:border-0 file:bg-emerald-700 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-emerald-600"
              />

              {file && (
                <div className="mt-2 text-xs text-emerald-400">
                  {file.name} — {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="surah"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                السورة
              </label>

              <select
                id="surah"
                value={surahNumber}
                onChange={(event) => setSurahNumber(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-emerald-500"
                required
              >
                <option value="">اختر السورة</option>

                {surahs.map((surah, index) => (
                  <option key={surah} value={index + 1}>
                    {index + 1}. {surah}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="ayah-from"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  من الآية
                </label>

                <input
                  id="ayah-from"
                  type="number"
                  min="1"
                  value={ayahFrom}
                  onChange={(event) => setAyahFrom(event.target.value)}
                  placeholder="مثال: 1"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="ayah-to"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  إلى الآية
                </label>

                <input
                  id="ayah-to"
                  type="number"
                  min="1"
                  value={ayahTo}
                  onChange={(event) => setAyahTo(event.target.value)}
                  placeholder="مثال: 5"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="riwaya"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                الرواية
              </label>

              <select
                id="riwaya"
                value={riwaya}
                onChange={(event) => setRiwaya(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-emerald-500"
              >
                <option value="حفص عن عاصم">حفص عن عاصم</option>
                <option value="ورش عن نافع">ورش عن نافع</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                ملاحظات
              </label>

              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                maxLength={500}
                rows={4}
                placeholder="مثال: أريد معرفة أخطائي في المدود..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-emerald-500"
              />

              <div className="mt-1 text-left text-xs text-slate-600">
                {notes.length}/500
              </div>
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
              disabled={uploading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "جاري رفع التسجيل..." : "إرسال التسجيل"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/85 p-5 shadow-2xl backdrop-blur-xl md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white">
                التسجيلات المرسلة
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                تسجيلات المجتمع
              </p>
            </div>

            <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-400">
              {submissions.length}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {submissions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/30 p-8 text-center">
                <div className="text-4xl">🎧</div>

                <p className="mt-3 font-medium text-slate-300">
                  لا توجد تسجيلات بعد
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  كن أول من يرسل تسجيلًا للمراجعة.
                </p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-white">
                        {submission.profiles?.[0]?.username || "عضو"}
                      </div>

                      <div className="mt-1 text-sm text-slate-400">
                        سورة {getSurahName(submission.surah_number)}
                        {submission.ayah_from
                          ? ` — الآيات ${submission.ayah_from}${
                              submission.ayah_to
                                ? `–${submission.ayah_to}`
                                : ""
                            }`
                          : ""}
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs ${statusClass(
                        submission.status
                      )}`}
                    >
                      {statusLabel(submission.status)}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    {submission.riwaya}
                  </div>

                  <audio
                    controls
                    preload="metadata"
                    src={submission.audio_src || ""}
                    className="mt-4 w-full"
                  />

                  {submission.notes && (
                    <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm leading-6 text-slate-400">
                      {submission.notes}
                    </div>
                  )}

                  <div className="mt-3 text-xs text-slate-600">
                    {new Intl.DateTimeFormat("ar-MA", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(submission.created_at))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}