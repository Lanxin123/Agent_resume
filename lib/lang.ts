import { Lang } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;

export function getLang(searchParams: SearchParams | undefined): Lang {
  const raw = searchParams?.lang;
  const lang = Array.isArray(raw) ? raw[0] : raw;
  return lang === "en" ? "en" : "zh";
}
