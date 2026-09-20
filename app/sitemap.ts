import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://quran-h1k.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quran`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/hadith`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/adhkar`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/recitations`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community/chat`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community/feedback`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community/benefits`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community/questions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/community/tajweed`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learn/quran`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/learn/hadith`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
    },
  ];
}