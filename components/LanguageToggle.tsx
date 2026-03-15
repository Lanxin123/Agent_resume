"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Lang } from "@/lib/types";

interface LanguageToggleProps {
  lang: Lang;
  label: string;
}

export function LanguageToggle({ lang, label }: LanguageToggleProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildHref = (nextLang: Lang) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLang);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="language-toggle" aria-label={label}>
      <span>{label}</span>
      <div className="switch">
        <Link href={buildHref("zh")} className={lang === "zh" ? "active" : ""}>
          中文
        </Link>
        <Link href={buildHref("en")} className={lang === "en" ? "active" : ""}>
          EN
        </Link>
      </div>
    </div>
  );
}
