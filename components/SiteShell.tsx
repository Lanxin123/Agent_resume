import type { ReactNode } from "react";
import { SideNav } from "@/components/SideNav";
import { Lang, SiteDictionary } from "@/lib/types";

interface SiteShellProps {
  lang: Lang;
  dictionary: SiteDictionary;
  children: ReactNode;
}

export function SiteShell({ lang, dictionary, children }: SiteShellProps) {
  const anchors = [
    { id: "hero", label: dictionary.nav.home },
    { id: "resume", label: dictionary.nav.resume },
    { id: "projects", label: dictionary.nav.projects },
    { id: "media", label: dictionary.nav.media },
    { id: "contact", label: dictionary.nav.contact }
  ];

  return (
    <div className="site-shell">
      <div className="site-orb site-orb-a" />
      <div className="site-orb site-orb-b" />
      <SideNav items={anchors} />

      <main>{children}</main>
    </div>
  );
}
