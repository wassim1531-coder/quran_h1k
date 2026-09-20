"use client";

import { useEffect, useRef, useState } from "react";

const DARK_VIDEO = "/videos/background.mp4";
const LIGHT_VIDEO = "/videos/light-background.mp4";
const SOUND_KEY = "quran_h1k_sound_enabled";

export default function VideoBackground() {
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);

  const [isDark, setIsDark] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const savedSound = localStorage.getItem(SOUND_KEY);

    if (savedSound === "false") {
      setSoundEnabled(false);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeVideo = isDark
      ? darkVideoRef.current
      : lightVideoRef.current;

    const inactiveVideo = isDark
      ? lightVideoRef.current
      : darkVideoRef.current;

    if (!activeVideo) return;

    if (inactiveVideo) {
      inactiveVideo.pause();
      inactiveVideo.muted = true;
    }

    activeVideo.volume = 0.12;

    const startVideo = async () => {
      try {
        activeVideo.muted = !soundEnabled;
        await activeVideo.play();
      } catch {
        activeVideo.muted = true;

        try {
          await activeVideo.play();
        } catch {}
      }
    };

    startVideo();

    const enableAudioAfterInteraction = () => {
      if (!soundEnabled) return;

      activeVideo.muted = false;
      activeVideo.volume = 0.12;

      activeVideo.play().catch(() => {});
    };

    window.addEventListener("pointerdown", enableAudioAfterInteraction, {
      once: true,
    });

    window.addEventListener("keydown", enableAudioAfterInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener(
        "pointerdown",
        enableAudioAfterInteraction
      );

      window.removeEventListener(
        "keydown",
        enableAudioAfterInteraction
      );
    };
  }, [isDark, soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;

    setSoundEnabled(next);
    localStorage.setItem(SOUND_KEY, String(next));

    const videos = [darkVideoRef.current, lightVideoRef.current];

    videos.forEach((video) => {
      if (!video) return;

      video.volume = 0.12;
      video.muted = !next;

      if (next) {
        video.play().catch(() => {});
      }
    });
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f8faf9] dark:bg-[#020f0c]">

        {/* DARK MODE */}

        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={darkVideoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src={DARK_VIDEO}
            autoPlay
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-[#020f0c]/70" />

          <div className="absolute inset-0 bg-gradient-to-b from-[#020f0c]/45 via-[#020f0c]/65 to-[#020f0c]/95" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.10),transparent_38%)]" />
        </div>

        {/* LIGHT MODE */}

        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        >
          <video
            ref={lightVideoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src={LIGHT_VIDEO}
            autoPlay
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          <div className="absolute inset-0 bg-white/25" />

          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-[#f8faf9]/20 to-[#eef5f2]/35" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.08),transparent_38%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>
      </div>

      {/* SOUND CONTROL */}

      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundEnabled ? "Mute background sound" : "Enable background sound"}
        title={soundEnabled ? "Mute background sound" : "Enable background sound"}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white dark:border-white/10 dark:bg-[#071914]/80 dark:text-white dark:hover:bg-[#0b211b]"
      >
        {soundEnabled ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5 6 9H3v6h3l5 4V5Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5 6 9H3v6h3l5 4V5Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19 9-6 6m0-6 6 6"
            />
          </svg>
        )}
      </button>
    </>
  );
}
