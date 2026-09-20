"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 1900);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] overflow-hidden bg-[#020f0c] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting
          ? "pointer-events-none opacity-0 scale-[1.04]"
          : "opacity-100 scale-100"
      }`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06),transparent_58%)]" />

      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/10 animate-[splashOrbit_6s_linear_infinite]" />

      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/10 animate-[splashOrbitReverse_8s_linear_infinite]" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-emerald-300 animate-[splashParticle_3s_ease-in-out_infinite]" />
        <div className="absolute left-[78%] top-[30%] h-1 w-1 rounded-full bg-amber-200 animate-[splashParticle_4s_ease-in-out_0.5s_infinite]" />
        <div className="absolute left-[25%] top-[72%] h-1 w-1 rounded-full bg-emerald-200 animate-[splashParticle_3.5s_ease-in-out_1s_infinite]" />
        <div className="absolute left-[82%] top-[76%] h-1 w-1 rounded-full bg-emerald-300 animate-[splashParticle_4.5s_ease-in-out_0.8s_infinite]" />
      </div>

      <div className="relative flex min-h-full flex-col items-center justify-center">
        <div className="relative animate-[splashIcon_1.5s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="absolute -inset-10 rounded-[32%] bg-emerald-400/10 blur-3xl animate-[splashGlow_2.5s_ease-in-out_infinite]" />
          <div className="absolute -inset-5 rounded-[28%] bg-amber-300/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[28%] shadow-[0_0_80px_rgba(16,185,129,0.22),0_0_35px_rgba(212,175,55,0.12)]">
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-transparent to-transparent animate-[splashShine_1.8s_ease-out_0.35s_both]" />
            <img
              src="/icons/icon.jpg"
              alt=""
              className="relative h-36 w-36 object-cover sm:h-40 sm:w-40"
            />
          </div>
        </div>

        <div className="mt-8 text-center animate-[splashText_1.1s_cubic-bezier(0.22,1,0.36,1)_0.55s_both]">
          <h1 className="text-3xl font-semibold tracking-[0.18em] text-white">
            quran_h1k
          </h1>

          <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

          <p className="mt-3 text-sm tracking-wide text-emerald-100/65">
            القرآن الكريم والعلوم الإسلامية
          </p>
        </div>

        <div className="mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-[splashProgress_1.8s_cubic-bezier(0.22,1,0.36,1)_0.2s_both] bg-gradient-to-r from-emerald-500 via-emerald-300 to-amber-200 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes splashIcon {
          0% {
            opacity: 0;
            filter: blur(14px);
            transform: scale(0.72) translateY(24px);
          }
          55% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1.06) translateY(-2px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1) translateY(0);
          }
        }

        @keyframes splashText {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes splashProgress {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes splashGlow {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.94);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.08);
          }
        }

        @keyframes splashShine {
          0% {
            transform: translateX(-120%) rotate(15deg);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          100% {
            transform: translateX(120%) rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes splashOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes splashOrbitReverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        @keyframes splashParticle {
          0%,
          100% {
            opacity: 0.15;
            transform: translateY(0) scale(0.7);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-18px) scale(1.3);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
