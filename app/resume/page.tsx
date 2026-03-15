import { SiteShell } from "@/components/SiteShell";
import { getResumeData, getSiteDictionary } from "@/lib/content";
import { getLang } from "@/lib/lang";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ResumePage({ searchParams }: PageProps) {
  const lang = getLang(searchParams);
  const isZh = lang === "zh";
  const [dictionary, resume] = await Promise.all([
    getSiteDictionary(lang),
    getResumeData()
  ]);

  return (
    <SiteShell lang={lang} dictionary={dictionary}>
      <section className="panel page-head">
        <p className="eyebrow">{dictionary.section.experience}</p>
        <h2>{isZh ? "经历与能力总览" : "Experience & Capability Overview"}</h2>
        <p>{isZh ? "按时间线展示职业经历、教育和核心技能。" : "A timeline view of work, education, and core skills."}</p>
      </section>

      <section className="panel">
        <h2>{dictionary.section.experience}</h2>
        {resume.experience.length === 0 && <p>{dictionary.misc.empty}</p>}
        <div className="timeline-wrap">
          {resume.experience.map((item) => (
            <article key={`${item.company}-${item.start}`} className="timeline-item">
              <div className="timeline-heading">
                <h3>{item.company}</h3>
                <p>{isZh ? item.roleZh : item.roleEn || item.roleZh}</p>
                <span>
                  {item.start} - {item.end}
                </span>
              </div>
              <ul>
                {(isZh ? item.highlightsZh : item.highlightsEn.length > 0 ? item.highlightsEn : item.highlightsZh).map(
                  (line, index) => (
                    <li key={`${item.company}-${index}`}>{line}</li>
                  )
                )}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel-surface">
        <h2>{dictionary.section.education}</h2>
        {resume.education.length === 0 && <p>{dictionary.misc.empty}</p>}
        <div className="card-grid">
          {resume.education.map((edu) => (
            <article key={`${edu.school}-${edu.start}`} className="card">
              <h3>{edu.school}</h3>
              <p>{isZh ? edu.degreeZh : edu.degreeEn || edu.degreeZh}</p>
              <p>{isZh ? edu.majorZh : edu.majorEn || edu.majorZh}</p>
              <p>
                {edu.start} - {edu.end}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel panel-surface">
        <h2>{dictionary.section.skills}</h2>
        <div className="tags">
          {resume.skills.length === 0 && <p>{dictionary.misc.empty}</p>}
          {resume.skills.map((skill) => (
            <span key={skill.name} className="tag">
              {skill.name}
              {skill.level ? ` (${skill.level})` : ""}
            </span>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
