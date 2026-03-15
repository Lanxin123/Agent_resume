"use client";

import { useEffect, useState } from "react";

interface SideNavItem {
  id: string;
  label: string;
}

interface SideNavProps {
  items: SideNavItem[];
}

export function SideNav({ items }: SideNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] }
    );

    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (scrolledToBottom) {
        const lastId = items[items.length - 1]?.id;
        if (lastId) {
          setActive(lastId);
        }
      }
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav className="site-nav side-nav" aria-label="Section Navigation">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={active === item.id ? "active" : ""}>
          <span className="nav-dot" />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

