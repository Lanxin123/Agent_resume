import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { SiteShell } from "@/components/SiteShell";
import { getLang } from "@/lib/lang";
import { getPositioning, getResumeData, getSiteDictionary, getVideos } from "@/lib/content";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const lang = getLang(searchParams);
  const [dictionary, resume, videos, positioning] = await Promise.all([
    getSiteDictionary(lang),
    getResumeData(),
    getVideos(),
    getPositioning()
  ]);
  const isZh = lang === "zh";
  const roleDuties = isZh
    ? [
        "基于业务场景构建 Agent 执行链，支持自动化任务与决策推理",
        "持续优化 Prompt 策略，提升模型响应质量与稳定性",
        "封装可复用 LLM Skill，支撑平台化能力复用",
        "参与 Agent 调度框架集成与调试，保障稳定运行",
        "编写技术文档与示例代码，支持团队协作落地"
      ]
    : [
        "Build agent execution chains for business scenarios to enable automation and reasoning",
        "Continuously optimize prompts to improve response quality and stability",
        "Package reusable LLM skills for platform-level capability reuse",
        "Integrate and debug agent orchestration frameworks for reliable operations",
        "Write technical docs and examples to support team adoption"
      ];

  const topCases = resume.projects.slice(0, 5);
  const trustExperience = resume.experience.slice(0, 2);

  return (
    <SiteShell lang={lang} dictionary={dictionary}>
      <ScrollRevealSection id="hero" className="hero panel-shell flow-section">
        <div className="hero-main">
          <div className="intro-stage">
            <p className="intro-line">{isZh ? positioning.heroValueZh : positioning.heroValueEn}</p>
          </div>
          <p className="hero-name">{resume.profile.name}</p>
          <p className="role">{isZh ? resume.profile.titleZh : resume.profile.titleEn}</p>
          <p className="summary">{isZh ? positioning.heroSubZh : positioning.heroSubEn}</p>
          <div className="hero-meta">
            <span>{resume.contact.phone}</span>
            <span>{resume.contact.email}</span>
          </div>
        </div>
        <aside className="hero-metrics">
          <article className="metric-card">
            <p>AI Agent</p>
            <strong>Solution</strong>
          </article>
          <article className="metric-card">
            <p>CodeX</p>
            <strong>Engineering</strong>
          </article>
          <article className="metric-card">
            <p>Unity/Cocos</p>
            <strong>Delivery</strong>
          </article>
        </aside>
      </ScrollRevealSection>

      <ScrollRevealSection id="resume" className="panel flow-section panel-surface">
        <div className="page-head">
          <p className="eyebrow">{dictionary.section.skills}</p>
          <h2>{isZh ? "核心能力模块" : "Core Capability Modules"}</h2>
        </div>
        <div className="capability-grid">
          {positioning.capabilities.map((cap) => (
            <article key={cap.titleEn} className="card capability-card">
              <h3>{isZh ? cap.titleZh : cap.titleEn}</h3>
              <p>{isZh ? cap.summaryZh : cap.summaryEn}</p>
            </article>
          ))}
        </div>
        <section className="role-duty-block card">
          <h3>{isZh ? "岗位职责匹配" : "Role Responsibility Match"}</h3>
          <ul className="role-duty-list">
            {roleDuties.map((duty) => (
              <li key={duty}>{duty}</li>
            ))}
          </ul>
        </section>
        <div className="skill-tree">
          <div className="skill-trunk" />
          {resume.skills.map((skill, index) => (
            <span key={skill.name} className={`skill-node ${index % 2 === 0 ? "left" : "right"} level-${(index % 3) + 1}`}>
              {skill.name}
            </span>
          ))}
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection id="projects" className="panel flow-section">
        <div className="page-head">
          <p className="eyebrow">{isZh ? "Solutions" : "Solutions"}</p>
          <h2>{isZh ? "典型场景解决方案" : "Solution Playbooks"}</h2>
        </div>
        <div className="solution-grid">
          {positioning.solutions.map((solution, index) => (
            <article key={`${solution.demandEn}-${index}`} className="card solution-card">
              <h3>{isZh ? solution.demandZh : solution.demandEn}</h3>
              <p className="solution-line">{isZh ? solution.approachZh : solution.approachEn}</p>
              <p className="solution-result">{isZh ? solution.resultZh : solution.resultEn}</p>
            </article>
          ))}
        </div>
        <div className="card-grid project-grid">
          {topCases.map((project) => (
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
            </article>
          ))}
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection id="media" className="panel flow-section panel-surface">
        <div className="page-head">
          <p className="eyebrow">{dictionary.section.videos}</p>
          <h2>{isZh ? "演示视频" : "Product Demos"}</h2>
        </div>
        <div className="video-grid">
          {videos.map((video) => (
            <article key={video.id} className="video-card">
              <video controls preload="metadata" poster={video.cover}>
                <source src={`/videos/${video.file}`} />
                {dictionary.misc.unavailable}
              </video>
              <h3>{isZh ? video.title_zh : video.title_en || video.title_zh}</h3>
            </article>
          ))}
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection id="contact" className="panel flow-section">
        <div className="page-head">
          <p className="eyebrow">{dictionary.section.experience}</p>
          <h2>{isZh ? "可信背书与合作入口" : "Credibility & Contact"}</h2>
        </div>
        <div className="trust-strip">
          {trustExperience.map((item) => (
            <article key={`${item.company}-${item.start}`} className="card trust-card">
              <h3>{item.company}</h3>
              <p>{isZh ? item.roleZh : item.roleEn || item.roleZh}</p>
              <span>
                {item.start} - {item.end}
              </span>
            </article>
          ))}
        </div>
        <section className="cta-band">
          <h2>{isZh ? positioning.cta.titleZh : positioning.cta.titleEn}</h2>
          <p>{isZh ? positioning.cta.subZh : positioning.cta.subEn}</p>
        </section>
        <p className="site-credit-text">{isZh ? "本网站由AI开发部署，git管理" : "This site is developed and deployed with AI, managed by Git."}</p>
      </ScrollRevealSection>
    </SiteShell>
  );
}
