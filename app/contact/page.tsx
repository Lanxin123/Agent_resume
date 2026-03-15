import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { getResumeData, getSiteDictionary } from "@/lib/content";
import { getLang } from "@/lib/lang";
import { maskHandle, maskPhone } from "@/lib/privacy";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const lang = getLang(searchParams);
  const [dictionary, resume] = await Promise.all([
    getSiteDictionary(lang),
    getResumeData()
  ]);

  const { contact, privacy, profile } = resume;
  const displayLocation = privacy.showLocation ? profile.location : dictionary.misc.privacyMasked;
  const displayPhone = privacy.showPhone ? contact.phone : maskPhone(contact.phone) || dictionary.misc.privacyMasked;
  const displayWechat = privacy.showWechat ? contact.wechat : maskHandle(contact.wechat) || dictionary.misc.privacyMasked;

  return (
    <SiteShell lang={lang} dictionary={dictionary}>
      <section className="panel page-head">
        <p className="eyebrow">{dictionary.section.contact}</p>
        <h2>{lang === "zh" ? "联系与协作" : "Contact & Collaboration"}</h2>
        <p>{lang === "zh" ? "欢迎通过以下方式沟通项目合作或岗位机会。" : "Feel free to reach out for collaboration or role opportunities."}</p>
      </section>

      <section className="panel">
        <h2>{dictionary.section.contact}</h2>
        <div className="contact-list contact-grid">
          <article className="contact-card">
            <p className="contact-label">Email</p>
            {privacy.showEmail && contact.email ? (
              <Link href={`mailto:${contact.email}`} className="text-link">
                {contact.email}
              </Link>
            ) : (
              dictionary.misc.privacyMasked
            )}
          </article>
          <article className="contact-card">
            <p className="contact-label">Phone</p>
            <p>{displayPhone}</p>
          </article>
          <article className="contact-card">
            <p className="contact-label">WeChat</p>
            <p>{displayWechat}</p>
          </article>
          <article className="contact-card">
            <p className="contact-label">GitHub</p>
            {contact.github ? (
              <Link href={contact.github} target="_blank" rel="noreferrer" className="text-link">
                {contact.github}
              </Link>
            ) : (
              dictionary.misc.unavailable
            )}
          </article>
          <article className="contact-card">
            <p className="contact-label">LinkedIn</p>
            {contact.linkedin ? (
              <Link href={contact.linkedin} target="_blank" rel="noreferrer" className="text-link">
                {contact.linkedin}
              </Link>
            ) : (
              dictionary.misc.unavailable
            )}
          </article>
          <article className="contact-card">
            <p className="contact-label">{dictionary.misc.location}</p>
            <p>{displayLocation}</p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
