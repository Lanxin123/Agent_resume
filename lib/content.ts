import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { Lang, PositioningData, ResumeData, SiteDictionary, VideoItem } from "@/lib/types";

function readJsonPath(...segments: string[]): string {
  return join(process.cwd(), ...segments);
}

async function readJsonFile<T>(path: string): Promise<T> {
  const content = await readFile(path, "utf8");
  return JSON.parse(content) as T;
}

export async function getResumeData(): Promise<ResumeData> {
  return readJsonFile<ResumeData>(readJsonPath("content", "resume.master.json"));
}

export async function getVideos(): Promise<VideoItem[]> {
  let configured: VideoItem[] = [];
  try {
    configured = await readJsonFile<VideoItem[]>(readJsonPath("content", "videos.json"));
  } catch {
    configured = [];
  }

  const existingFiles = await readdir(readJsonPath("public", "videos"));
  const playableFiles = existingFiles.filter((name) => /\.(mp4|webm|mov|m4v|avi)$/i.test(name));

  const configuredMap = new Map(configured.map((item) => [item.file, item]));
  const merged: VideoItem[] = [...configured];

  playableFiles.forEach((file, index) => {
    if (!configuredMap.has(file)) {
      merged.push({
        id: `auto-${index + 1}`,
        file,
        title_zh: file,
        title_en: file,
        desc_zh: "",
        desc_en: "",
        cover: "",
        order: 1000 + index
      });
    }
  });

  return merged.sort((a, b) => a.order - b.order);
}

export async function getSiteDictionary(lang: Lang): Promise<SiteDictionary> {
  const filename = lang === "en" ? "en.json" : "zh.json";
  return readJsonFile<SiteDictionary>(readJsonPath("content", "i18n", filename));
}

export async function getPositioning(): Promise<PositioningData> {
  return readJsonFile<PositioningData>(readJsonPath("content", "positioning.json"));
}
