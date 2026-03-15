"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function ScrollRevealSection({ id, className = "", children }: ScrollRevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`reveal-section ${className}`.trim()}>
      {children}
    </section>
  );
}
