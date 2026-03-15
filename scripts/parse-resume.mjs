import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import iconv from "iconv-lite";
import mammoth from "mammoth";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        args[key] = "true";
      } else {
        args[key] = value;
        i += 1;
      }
    }
  }
  return args;
}

function normalizeLine(line) {
  return line.replace(/\s+/g, " ").trim();
}

function looksLikeMojibake(text) {
  if (!text) {
    return false;
  }
  const noisy = (text.match(/[�涓鍙锛鎴鎺鐢缁瀛]/g) ?? []).length;
  return noisy >= Math.max(2, Math.floor(text.length * 0.08));
}

function repairMojibake(text) {
  try {
    const bytes = iconv.encode(text, "gbk");
    const repaired = iconv.decode(bytes, "utf8");
    return repaired.includes("�") ? text : repaired;
  } catch {
    return text;
  }
}

function splitLines(rawText) {
  const base = looksLikeMojibake(rawText) ? repairMojibake(rawText) : rawText;
  return base
    .split(/\r?\n/)
    .map(normalizeLine)
    .map((line) => (looksLikeMojibake(line) ? repairMojibake(line) : line))
    .filter(Boolean);
}

function detectSection(line) {
  const map = [
    { key: "experience", patterns: ["工作经历", "experience", "professional experience"] },
    { key: "education", patterns: ["教育", "education"] },
    { key: "projects", patterns: ["项目", "projects"] },
    { key: "skills", patterns: ["技能", "skills"] },
    { key: "contact", patterns: ["联系方式", "contact"] }
  ];
  const low = line.toLowerCase();
  for (const item of map) {
    if (item.patterns.some((pattern) => low.includes(pattern.toLowerCase()))) {
      return item.key;
    }
  }
  return null;
}

function buildBaseResume() {
  return {
    profile: {
      name: "",
      titleZh: "",
      titleEn: "",
      summaryZh: "",
      summaryEn: "",
      location: ""
    },
    experience: [],
    education: [],
    projects: [],
    skills: [],
    contact: {},
    privacy: {
      showEmail: true,
      showPhone: false,
      showWechat: false,
      showLocation: true
    }
  };
}

function parseResumeText(lines) {
  const result = buildBaseResume();
  if (lines.length === 0) {
    return result;
  }

  result.profile.name = lines[0] ?? "";
  result.profile.summaryZh = lines.slice(1, 4).join(" ");

  let section = "profile";
  for (const line of lines) {
    const detected = detectSection(line);
    if (detected) {
      section = detected;
      continue;
    }

    if (section === "skills" && line.length < 80) {
      const tokens = line.split(/[，,、/|]/).map((item) => item.trim()).filter(Boolean);
      if (tokens.length > 0) {
        result.skills.push(
          ...tokens.map((name) => ({
            name,
            level: ""
          }))
        );
      }
    }

    if (section === "projects" && line.length > 8) {
      result.projects.push({
        name: line.slice(0, 28),
        descriptionZh: line,
        descriptionEn: "",
        tags: [],
        link: ""
      });
    }

    if (section === "education" && line.length > 6) {
      result.education.push({
        school: line,
        degreeZh: "",
        degreeEn: "",
        majorZh: "",
        majorEn: "",
        start: "",
        end: ""
      });
    }

    if (section === "experience" && line.length > 8) {
      result.experience.push({
        company: line.slice(0, 20),
        roleZh: "",
        roleEn: "",
        start: "",
        end: "",
        highlightsZh: [line],
        highlightsEn: []
      });
    }

    if (section === "contact") {
      if (line.includes("@")) {
        result.contact.email = line.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
      }
      const phone = line.match(/(\+?\d[\d\s-]{7,}\d)/)?.[0];
      if (phone) {
        result.contact.phone = phone;
      }
      if (/github/i.test(line)) {
        result.contact.github = line;
      }
      if (/linkedin/i.test(line)) {
        result.contact.linkedin = line;
      }
    }
  }

  return result;
}

async function run() {
  const args = parseArgs(process.argv);
  const input = resolve(args.input ?? "data-source/resume.docx");
  const output = resolve(args.out ?? "content/resume.master.json");

  if (!existsSync(input)) {
    throw new Error(`Input docx not found: ${input}`);
  }

  const buffer = readFileSync(input);
  const { value } = await mammoth.extractRawText({ buffer });
  const lines = splitLines(value);
  const parsed = parseResumeText(lines);

  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

  console.log(`Parsed ${lines.length} lines from ${input}`);
  console.log(`Wrote structured JSON to ${output}`);
}

run().catch((error) => {
  console.error(`Parse failed: ${error.message}`);
  process.exit(1);
});
