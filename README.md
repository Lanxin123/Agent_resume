# Resume Visual Site

A multi-page personal resume website built with Next.js + TypeScript.

## Quick Start

1. Install Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Run dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Content Workflow

1. Put your resume file at `data-source/resume.docx`.
2. Parse resume into structured JSON:

```bash
npm run parse:resume -- --input data-source/resume.docx --out content/resume.master.json
```

3. Manually review and polish `content/resume.master.json`.
4. Put videos into `public/videos`.
5. Update `content/videos.json` to map `file` names to your video files.

## Bilingual

- Chinese copy: `content/i18n/zh.json`
- English copy: `content/i18n/en.json`

Language switch uses `?lang=zh` and `?lang=en`.

## Deploy

Deploy to Vercel:

```bash
npm run build
```

Then import the repository in Vercel.
