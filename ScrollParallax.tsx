"use client";

import { useEffect, useRef } from "react";

type ScrollParallaxProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export default function ScrollParallax({
  children,
  className = "",
  strength = 14,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = elementCenter - viewportCenter;
        const offset = Math.max(
          -strength,
          Math.min(strength, distance * 0.035)
        );

        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
