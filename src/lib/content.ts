import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export type Access = "free" | "premium" | "paid";
export type ContentSection =
  | "learn"
  | "interviews"
  | "conferences"
  | "blog"
  | "tracks";

/** -------------------- Generic Content -------------------- */

export type ContentMeta = {
  slug: string;
  title: string;
  type: "lesson" | "post";
  section: ContentSection;
  access: Access;
  tags?: string[];
  description?: string;
  date?: string;
};

/**
 * Returns absolute path to a section directory
 * Example: src/content/learn
 */
function getDir(section: ContentSection) {
  return path.join(process.cwd(), "src", "content", section);
}

/**
 * Finds an MDX or MD file for a given slug.
 * IMPORTANT: slug can include subpaths like "60-day-cpp-interview/abi-object-layout"
 */
function findFilePath(section: ContentSection, slug: string) {
  const dir = getDir(section);

  const mdxPath = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(mdxPath)) return mdxPath;

  const mdPath = path.join(dir, `${slug}.md`);
  if (fs.existsSync(mdPath)) return mdPath;

  return null;
}

/**
 * Recursively list all .mdx/.md files under a directory.
 * Returns slugs relative to section dir, including subfolders.
 */
function listFilesRecursive(rootDir: string, currentDir = rootDir): string[] {
  if (!fs.existsSync(currentDir)) return [];
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  const out: string[] = [];
  for (const e of entries) {
    const full = path.join(currentDir, e.name);
    if (e.isDirectory()) {
      out.push(...listFilesRecursive(rootDir, full));
      continue;
    }
    if (e.isFile() && (e.name.endsWith(".mdx") || e.name.endsWith(".md"))) {
      const rel = path.relative(rootDir, full); // e.g. "track/lesson.mdx"
      out.push(rel);
    }
  }
  return out;
}

/**
 * Returns list of content metadata for a section
 * Used by index pages like /learn, /blog, etc.
 * Supports nested folders (e.g. learn/<trackSlug>/<lessonSlug>.mdx)
 */
export function listContent(section: ContentSection): ContentMeta[] {
  const dir = getDir(section);
  if (!fs.existsSync(dir)) return [];

  const filesRel = listFilesRecursive(dir).filter(
    (f) => f.endsWith(".mdx") || f.endsWith(".md")
  );

  const items = filesRel.map((relFile) => {
    const slug = relFile.replace(/\.(mdx|md)$/, "").replaceAll("\\", "/"); // windows safe
    const fullPath = path.join(dir, relFile);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: String(data.title ?? slug),
      type: (data.type ?? "post") as "lesson" | "post",
      section,
      access: (data.access ?? "free") as Access,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      description: data.description ? String(data.description) : undefined,
      date: data.date ? String(data.date) : undefined,
    } satisfies ContentMeta;
  });

  // Sort newest first (if date exists)
  items.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });

  return items;
}

/**
 * Loads full content (meta + body) by slug
 */
export function getContentBySlug(section: ContentSection, slug: string) {
  const filePath = findFilePath(section, slug);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta: ContentMeta = {
    slug,
    title: String(data.title ?? slug),
    type: (data.type ?? "post") as "lesson" | "post",
    section,
    access: (data.access ?? "free") as Access,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    description: data.description ? String(data.description) : undefined,
    date: data.date ? String(data.date) : undefined,
  };

  return { meta, content };
}

/**
 * Same as getContentBySlug, but throws 404 if missing
 * Used by dynamic routes
 */
export function requireContent(section: ContentSection, slug: string) {
  const item = getContentBySlug(section, slug);

  // dev debug (safe)
  // console.log("LOOKING FOR:", {
  //   section,
  //   slug,
  //   path: path.join(process.cwd(), "src", "content", section, `${slug}.mdx`),
  // });

  if (!item) {
    const dir = getDir(section);
    const files = fs.existsSync(dir) ? listFilesRecursive(dir) : [];
    console.error(
      `[cppvalley] Content not found → section=${section}, slug=${slug}, files=[${files
        .slice(0, 60)
        .join(", ")}${files.length > 60 ? ", ..." : ""}]`
    );
    notFound();
  }

  return item;
}

/** -------------------- Tracks -------------------- */

export type TrackMeta = {
  slug: string;
  title: string;
  access: Access;
  live: boolean;
  duration?: string;
  level?: string;
  description?: string;
  lessonCount?: number;
  tags?: string[];
  price?: number; // per-track price (frontmatter: price: 1999)
};

// Item can be a leaf lesson OR a parent module with children
export type TrackSyllabusItem =
  | { title: string; slug: string; access: Access }
  | {
      title: string;
      access: Access;
      children: { title: string; slug: string; access: Access }[];
    };

export type TrackSection = {
  title: string;
  items: TrackSyllabusItem[];
};

function getTracksDir() {
  return path.join(process.cwd(), "src", "content", "tracks");
}

function parsePrice(raw: any): number | undefined {
  if (raw === undefined || raw === null || raw === "") return undefined;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : undefined;

  const s = String(raw).trim();
  const digits = s.replace(/[^\d.]/g, "");
  if (!digits) return undefined;

  const n = Number(digits);
  return Number.isFinite(n) ? n : undefined;
}

export function listTracks(): TrackMeta[] {
  const dir = getTracksDir();
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const tracks = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    const slug = String(data.slug ?? file.replace(/\.(mdx|md)$/, ""));

    return {
      slug,
      title: String(data.title ?? slug),
      access: (data.access ?? "free") as Access,
      live: data.live !== false,
      duration: data.duration ? String(data.duration) : undefined,
      level: data.level ? String(data.level) : undefined,
      description: data.description ? String(data.description) : undefined,
      lessonCount: data.lessonCount ? Number(data.lessonCount) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      price: parsePrice((data as any).price),
    } satisfies TrackMeta;
  });

  return tracks;
}

export function getTrackBySlug(trackSlug: string) {
  const dir = getTracksDir();
  const mdxPath = path.join(dir, `${trackSlug}.mdx`);
  const mdPath = path.join(dir, `${trackSlug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
    ? mdPath
    : null;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta: TrackMeta = {
    slug: String(data.slug ?? trackSlug),
    title: String(data.title ?? trackSlug),
    access: (data.access ?? "free") as Access,
    live: data.live !== false,
    duration: data.duration ? String(data.duration) : undefined,
    level: data.level ? String(data.level) : undefined,
    description: data.description ? String(data.description) : undefined,
    lessonCount: data.lessonCount ? Number(data.lessonCount) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    price: parsePrice((data as any).price),
  };

  return { meta, content };
}

/**
 * Robust parser for syllabus JSON blocks inside the track MDX.
 * Supports:
 * - leaf lesson: { title, slug, access }
 * - module with children: { title, access, children:[{title,slug,access}] }
 *
 * This version is resilient to:
 * - extra blank lines
 * - a markdown separator `---` after a JSON block
 */
export function parseTrackSyllabus(trackContent: string): TrackSection[] {
  const lines = trackContent.split("\n");

  const sections: TrackSection[] = [];
  let current: TrackSection | null = null;

  let collecting = false;
  let jsonBuf: string[] = [];
  let braceBalance = 0;

  const countBraces = (s: string) => {
    let open = 0;
    let close = 0;
    for (const ch of s) {
      if (ch === "{") open++;
      else if (ch === "}") close++;
    }
    return open - close;
  };

  const cleanJsonText = (raw: string) => {
    // If a block accidentally captured trailing `---`, strip it.
    // Also remove Windows CR.
    return raw.replace(/\r/g, "").replace(/\n---\s*$/g, "").trim();
  };

  const flushJson = () => {
    if (!current) return;

    const raw0 = jsonBuf.join("\n").trim();
    jsonBuf = [];
    collecting = false;
    braceBalance = 0;

    const raw = cleanJsonText(raw0);

    try {
      const obj = JSON.parse(raw);

      // module with children
      if (obj && Array.isArray(obj.children)) {
        const parentAccess = (obj.access ?? "free") as Access;

        current.items.push({
          title: String(obj.title ?? "Untitled"),
          access: parentAccess,
          children: obj.children.map((c: any) => ({
            title: String(c.title ?? "Untitled"),
            slug: String(c.slug ?? ""),
            // child access wins; else inherit parent access; else free
            access: (c.access ?? parentAccess ?? "free") as Access,
          })),
        });
        return;
      }

      // single lesson
      if (obj && obj.slug) {
        current.items.push({
          title: String(obj.title ?? obj.slug),
          slug: String(obj.slug),
          access: (obj.access ?? "free") as Access,
        });
      }
    } catch {
      // ignore malformed JSON blocks
      return;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // headings: support ## and ###, but ignore "Syllabus"
    const heading = trimmed.match(/^#{2,3}\s+(.*)\s*$/);
    if (heading) {
      const title = heading[1].trim();
      if (title.toLowerCase() === "syllabus") continue;

      if (collecting) flushJson();

      current = { title, items: [] };
      sections.push(current);
      continue;
    }

    // start JSON bullet block
    if (!collecting && trimmed.startsWith("- {")) {
      if (!current) continue;

      collecting = true;
      const first = trimmed.replace(/^- /, ""); // remove "- "
      jsonBuf.push(first);
      braceBalance += countBraces(first);

      if (braceBalance === 0) flushJson();
      continue;
    }

    // keep collecting until braces balance to 0
    if (collecting) {
      // stop capturing if line is exactly '---' AND we already closed braces (safety)
      if (trimmed === "---" && braceBalance === 0) {
        flushJson();
        continue;
      }

      jsonBuf.push(trimmed);
      braceBalance += countBraces(trimmed);

      if (braceBalance === 0) flushJson();
    }
  }

  if (collecting) flushJson();
  return sections;
}

export function flattenTrackLessonSlugs(sections: TrackSection[]): string[] {
  const slugs: string[] = [];

  for (const sec of sections) {
    for (const it of sec.items as any[]) {
      if (it && Array.isArray(it.children)) {
        for (const child of it.children) {
          if (child?.slug) slugs.push(child.slug);
        }
      } else if (it?.slug) {
        slugs.push(it.slug);
      }
    }
  }

  return Array.from(new Set(slugs));
}
