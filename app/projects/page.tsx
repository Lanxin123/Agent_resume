import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { getResumeData, getSiteDictionary } from "@/lib/content";
import { getLang } from "@/lib/lang";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const lang = getLang(searchParams);
  const isZh = lang === "zh";
  const [dictionary, resume] = await Promise.all([
    getSiteDictionary(lang),
    getResumeData()
  ]);

  return (
    <SiteShell lang={lang} dictionary={dictionary}>
      <section className="panel page-head">
        <p className="eyebrow">{dictionary.section.projects}</p>
        <h2>{isZh ? "项目作品展示" : "Selected Projects"}</h2>
        <p>{isZh ? "聚焦问题、方案和结果，强调可交付价值。" : "Focused on problems, solutions, and measurable outcomes."}</p>
      </section>

      <section className="panel">
        <h2>{dictionary.section.projects}</h2>
        {resume.projects.length === 0 && <p>{dictionary.misc.empty}</p>}
        <div className="card-grid project-grid">
          {resume.projects.map((project) => (
            <article key={project.name} className="card project-card">
              <h3>{project.name}</h3>
              <p>{isZh ? project.descriptionZh : project.descriptionEn || project.descriptionZh}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={`${project.name}-${tag}`} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <Link href={project.link} target="_blank" rel="noreferrer" className="text-link">
                  {project.link}
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
