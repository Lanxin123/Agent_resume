import { SiteShell } from "@/components/SiteShell";
import { getSiteDictionary, getVideos } from "@/lib/content";
import { getLang } from "@/lib/lang";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function MediaPage({ searchParams }: PageProps) {
  const lang = getLang(searchParams);
  const isZh = lang === "zh";
  const [dictionary, videos] = await Promise.all([getSiteDictionary(lang), getVideos()]);

  return (
    <SiteShell lang={lang} dictionary={dictionary}>
      <section className="panel page-head">
        <p className="eyebrow">{dictionary.section.videos}</p>
        <h2>{isZh ? "视频与动态作品" : "Media Showcase"}</h2>
        <p>{isZh ? "用于展示产品 Demo、交互流程和创意表达。" : "Showcasing demos, interaction flows, and visual storytelling."}</p>
      </section>

      <section className="panel">
        <h2>{dictionary.section.videos}</h2>
        {videos.length === 0 && <p>{dictionary.misc.empty}</p>}
        <div className="video-grid">
          {videos.map((video) => (
            <article key={video.id} className="video-card">
              <video controls preload="metadata" poster={video.cover}>
                <source src={`/videos/${video.file}`} />
                {dictionary.misc.unavailable}
              </video>
              <h3>{isZh ? video.title_zh : video.title_en || video.title_zh}</h3>
              <p>{isZh ? video.desc_zh : video.desc_en || video.desc_zh}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
