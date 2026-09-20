import SmoothScroll from "../SmoothScroll";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import VideoBackground from "@/components/VideoBackground";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "quran_h1k - القرآن الكريم والعلوم الإسلامية",
  description:
    "موقع وتطبيق إسلامي شامل للقرآن الكريم بروايتي ورش وحفص، الأحاديث النبوية، الأذكار، وعلوم التجويد.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "quran_h1k",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  verification: {
    google: "Rgb5mWgbduGFuvlZkrK-m4ej59wFrVJ7V2h9sen_ycM",
  },
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("quran-h1k-theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark");if(!t)localStorage.setItem("quran-h1k-theme","dark")}}catch(e){document.documentElement.classList.add("dark")}})()`,
          }}
        />
      </head>
      <body className="bg-transparent text-stone-900 dark:bg-transparent dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-600 selection:text-white">
        <SplashScreen />
      <VideoBackground />
        <Navbar />
        <main className="flex-1 pb-20 md:pb-10 pt-4 px-4 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}