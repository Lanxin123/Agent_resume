export type Lang = "zh" | "en";

export interface ResumeProfile {
  name: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  location: string;
}

export interface ResumeExperience {
  company: string;
  roleZh: string;
  roleEn: string;
  start: string;
  end: string;
  highlightsZh: string[];
  highlightsEn: string[];
}

export interface ResumeEducation {
  school: string;
  degreeZh: string;
  degreeEn: string;
  majorZh: string;
  majorEn: string;
  start: string;
  end: string;
}

export interface ResumeProject {
  name: string;
  descriptionZh: string;
  descriptionEn: string;
  tags: string[];
  link?: string;
}

export interface ResumeSkill {
  name: string;
  level?: string;
}

export interface ResumeContact {
  email?: string;
  phone?: string;
  wechat?: string;
  github?: string;
  linkedin?: string;
}

export interface PrivacyConfig {
  showEmail: boolean;
  showPhone: boolean;
  showWechat: boolean;
  showLocation: boolean;
}

export interface ResumeData {
  profile: ResumeProfile;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkill[];
  contact: ResumeContact;
  privacy: PrivacyConfig;
}

export interface VideoItem {
  id: string;
  file: string;
  title_zh: string;
  title_en: string;
  desc_zh: string;
  desc_en: string;
  cover?: string;
  order: number;
}

export interface SiteDictionary {
  brand: string;
  tagline: string;
  nav: {
    home: string;
    resume: string;
    projects: string;
    media: string;
    contact: string;
  };
  home: {
    headline: string;
    subtitle: string;
    ctaResume: string;
    ctaProjects: string;
  };
  section: {
    experience: string;
    education: string;
    skills: string;
    projects: string;
    videos: string;
    contact: string;
  };
  misc: {
    language: string;
    empty: string;
    unavailable: string;
    privacyMasked: string;
    location: string;
  };
}

export interface PositioningCapability {
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
}

export interface PositioningSolution {
  demandZh: string;
  demandEn: string;
  approachZh: string;
  approachEn: string;
  resultZh: string;
  resultEn: string;
}

export interface PositioningCta {
  titleZh: string;
  titleEn: string;
  subZh: string;
  subEn: string;
  primaryZh: string;
  primaryEn: string;
  secondaryZh: string;
  secondaryEn: string;
}

export interface PositioningData {
  heroValueZh: string;
  heroValueEn: string;
  heroSubZh: string;
  heroSubEn: string;
  capabilities: PositioningCapability[];
  solutions: PositioningSolution[];
  cta: PositioningCta;
}
