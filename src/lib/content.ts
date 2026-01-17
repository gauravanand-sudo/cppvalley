import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export type Access = "free" | "premium" | "paid";
export type ContentSection = "learn" | "interviews" | "conferences" | "blog";






export type TrackSection = {
  title: string;
  items: {
    title: string;
    slug: string;
    access: "free" | "premium" | "paid";
  }[];
};


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
 * Finds an MDX or MD file for a given slug
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
 * Returns list of content metadata for a section
 * Used by index pages like /learn, /blog, etc.
 */
export function listContent(section: ContentSection): ContentMeta[] {
  const dir = getDir(section);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items = files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const fullPath = path.join(dir, file);
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
    };
  });

  // Sort newest first (if date exists)
  items.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });

  return items;
}

/**
 * Loads full content (meta + MDX body) by slug
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

  if (!item) {
    // Helpful debug output during development
    const dir = getDir(section);
    const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    console.error(
      `[cppvalley] Content not found → section=${section}, slug=${slug}, files=[${files.join(
        ", "
      )}]`
    );
    notFound();
  }

  return item;
}


// -------------------- TRACKS --------------------
export type TrackMeta = {
  slug: string;
  title: string;
  access: Access;
  duration?: string;
  level?: string;
  description?: string;
};

export type TrackSection = {
  title: string;
  items: { title: string; slug: string; access: Access }[];
};

function getTracksDir() {
  return path.join(process.cwd(), "src", "content", "tracks");
}

export function listTracks(): TrackMeta[] {
  const dir = getTracksDir();
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const tracks = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(raw);
    const slug = String(data.slug ?? file.replace(/\.(mdx|md)$/, ""));

    return {
      slug,
      title: String(data.title ?? slug),
      access: (data.access ?? "free") as Access,
      duration: data.duration ? String(data.duration) : undefined,
      level: data.level ? String(data.level) : undefined,
      description: data.description ? String(data.description) : undefined,
    } satisfies TrackMeta;
  });

  return tracks;
}

export function getTrackBySlug(trackSlug: string) {
  const dir = getTracksDir();
  const mdxPath = path.join(dir, `${trackSlug}.mdx`);
  const mdPath = path.join(dir, `${trackSlug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta: TrackMeta = {
    slug: String(data.slug ?? trackSlug),
    title: String(data.title ?? trackSlug),
    access: (data.access ?? "free") as Access,
    duration: data.duration ? String(data.duration) : undefined,
    level: data.level ? String(data.level) : undefined,
    description: data.description ? String(data.description) : undefined,
  };

  return { meta, content };
}

export function parseTrackSyllabus(trackContent: string): TrackSection[] {
  const lines = trackContent.split("\n");

  const sections: TrackSection[] = [];
  let current: TrackSection | null = null;

  let collecting = false;
  let jsonBuf: string[] = [];
  let braceBalance = 0;

  const flushJson = () => {
    if (!current) return;

    const raw = jsonBuf.join("\n").trim();
    jsonBuf = [];
    collecting = false;
    braceBalance = 0;

    try {
      const obj = JSON.parse(raw);

      // parent/module with children
      if (Array.isArray(obj.children)) {
        current.items.push({
          title: String(obj.title ?? "Untitled"),
          access: (obj.access ?? "free") as Access,
          children: obj.children.map((c: any) => ({
            title: String(c.title ?? "Untitled"),
            slug: String(c.slug ?? ""),
            access: (c.access ?? "free") as Access,
          })),
        });
        return;
      }

      // single lesson
      if (obj.slug) {
        current.items.push({
          title: String(obj.title ?? obj.slug),
          slug: String(obj.slug),
          access: (obj.access ?? "free") as Access,
        });
      }
    } catch {
      // ignore malformed JSON blocks
    }
  };

  const countBraces = (s: string) => {
    // Simple brace counting (good enough for our syllabus JSON)
    // Assumes braces not used inside strings in a tricky way.
    let open = 0;
    let close = 0;
    for (const ch of s) {
      if (ch === "{") open++;
      else if (ch === "}") close++;
    }
    return open - close;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // headings: support ## and ###, but ignore "Syllabus"
    const heading = trimmed.match(/^#{2,3}\s+(.*)\s*$/);
    if (heading) {
      const title = heading[1].trim();
      if (title.toLowerCase() === "syllabus") continue;

      // if a JSON block was half-collected and a new heading comes, flush safely
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
      // if it was a one-liner (balance 0), flush immediately
      if (braceBalance === 0) flushJson();
      continue;
    }

    // keep collecting until braces balance to 0
    if (collecting) {
      jsonBuf.push(trimmed);
      braceBalance += countBraces(trimmed);
      if (braceBalance === 0) flushJson();
    }
  }

  // flush at end if still collecting
  if (collecting) flushJson();

  return sections;
}


export function flattenTrackLessonSlugs(sections: TrackSection[]): string[] {
  const slugs: string[] = [];

  for (const sec of sections) {
    for (const it of sec.items as any[]) {
      if ("children" in it && Array.isArray(it.children)) {
        for (const child of it.children) {
          if (child?.slug) slugs.push(child.slug);
        }
      } else if (it?.slug) {
        slugs.push(it.slug);
      }
    }
  }

  // remove duplicates while preserving order
  return Array.from(new Set(slugs));
}

