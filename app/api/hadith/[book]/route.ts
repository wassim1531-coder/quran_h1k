import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const allowedBooks = new Set([
  "bukhari",
  "muslim",
  "abu-dawud",
  "tirmidhi",
  "nasai",
  "ibn-majah",
  "ahmad",
  "darimi",
  "malik",
]);

const fileNames: Record<string, string> = {
  bukhari: "bukhari.json",
  muslim: "muslim.json",
  "abu-dawud": "abu-dawud.json",
  tirmidhi: "tirmidhi.json",
  nasai: "nasai.json",
  "ibn-majah": "ibn-majah.json",
  ahmad: "ahmad.json",
  darimi: "darimi.json",
  malik: "malik.json",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ book: string }> }
) {
  try {
    const { book } = await params;

    if (!allowedBooks.has(book)) {
      return NextResponse.json({ error: "الكتاب غير موجود" }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = (searchParams.get("q") || "").trim();
    const chapterId = searchParams.get("chapter");
    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || "30")));

    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "hadith",
      fileNames[book]
    );

    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    const chapters = Array.isArray(data.chapters) ? data.chapters : [];
    const chapterMap = new Map(
      chapters.map((chapter: { id: number; arabic: string; english?: string }) => [
        chapter.id,
        chapter,
      ])
    );

    let hadiths = Array.isArray(data.hadiths) ? data.hadiths : [];

    if (chapterId) {
      const id = Number(chapterId);
      hadiths = hadiths.filter(
        (hadith: { chapterId: number }) => hadith.chapterId === id
      );
    }

    if (query) {
      const normalized = query.toLowerCase();

      hadiths = hadiths.filter(
        (hadith: {
          idInBook: number;
          arabic: string;
          english?: { narrator?: string; text?: string };
        }) => {
          const arabic = hadith.arabic || "";
          const narrator = hadith.english?.narrator || "";
          const english = hadith.english?.text || "";

          return (
            String(hadith.idInBook).includes(query) ||
            arabic.toLowerCase().includes(normalized) ||
            narrator.toLowerCase().includes(normalized) ||
            english.toLowerCase().includes(normalized)
          );
        }
      );
    }

    const total = hadiths.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;

    const results = hadiths.slice(start, start + limit).map(
      (hadith: {
        id: number;
        idInBook: number;
        chapterId: number;
        bookId: number;
        arabic: string;
        english?: { narrator?: string; text?: string };
      }) => {
        const chapter = chapterMap.get(hadith.chapterId) as
          | { id: number; arabic: string; english?: string }
          | undefined;

        return {
          id: hadith.id,
          number: hadith.idInBook,
          chapterId: hadith.chapterId,
          chapter: chapter?.arabic || "",
          chapterEnglish: chapter?.english || "",
          arabic: hadith.arabic,
          english: hadith.english || null,
        };
      }
    );

    return NextResponse.json(
      {
        book: data.metadata,
        chapters,
        hadiths: results,
        pagination: {
          page: safePage,
          limit,
          total,
          totalPages,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Hadith API error:", error);
    return NextResponse.json(
      { error: "تعذر تحميل الأحاديث" },
      { status: 500 }
    );
  }
}
