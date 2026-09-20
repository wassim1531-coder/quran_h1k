"use client";

import { useEffect, useRef } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  parallax?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  parallax = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("scroll-reveal-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const transform =
    direction === "up"
      ? "translateY(32px)"
      : direction === "down"
        ? "translateY(-32px)"
        : direction === "left"
          ? "translateX(32px)"
          : "translateX(-32px)";

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={
        {
          "--reveal-transform": transform,
          "--reveal-delay": `${delay}ms`,
          "--parallax": parallax,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
