import { coursesBySlug } from "@/data/courses";

const fallbackGradients: [string, string][] = [
  ["#0056d2", "#003b8f"],
  ["#6d28d9", "#1d4ed8"],
  ["#0f766e", "#115e59"],
  ["#b45309", "#7c2d12"],
  ["#111827", "#374151"],
];

type Params = {
  params: Promise<{ slug: string }>;
};

function escapeSvg(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .slice(0, 5)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function gradientForSlug(slug: string): [string, string] {
  const index = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % fallbackGradients.length;
  return fallbackGradients[index];
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const course = coursesBySlug.get(slug);
  const [from, to] = course?.coverGradient ?? gradientForSlug(slug);
  const title = course?.shortTitle ?? titleFromSlug(slug);
  const code = course?.coverCode ?? "cppvalley";
  const icon = course?.coverIcon ?? "<>";
  const tag = course?.pillar ?? "Learning resource";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${escapeSvg(title)} cover">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
    <radialGradient id="r" cx="78%" cy="20%" r="65%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.34)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.24" />
    </filter>
  </defs>
  <rect width="1200" height="675" fill="url(#g)" />
  <rect width="1200" height="675" fill="url(#r)" />
  <circle cx="1010" cy="110" r="210" fill="rgba(255,255,255,0.16)" />
  <circle cx="990" cy="590" r="260" fill="rgba(255,255,255,0.10)" />
  <path d="M70 522 C220 430 360 585 520 500 C710 398 820 505 1130 340" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="18" stroke-linecap="round" />
  <g filter="url(#shadow)">
    <rect x="82" y="82" width="1036" height="510" rx="28" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.30)" />
  </g>
  <text x="116" y="148" fill="rgba(255,255,255,0.82)" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="3">CPPVALLEY COURSE</text>
  <text x="116" y="228" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800" letter-spacing="-3">${escapeSvg(title)}</text>
  <text x="116" y="312" fill="rgba(255,255,255,0.86)" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${escapeSvg(tag)}</text>
  <rect x="116" y="405" width="330" height="76" rx="38" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.36)" />
  <text x="148" y="454" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="800">${escapeSvg(code)}</text>
  <text x="880" y="500" text-anchor="middle" fill="rgba(255,255,255,0.24)" font-family="Arial, Helvetica, sans-serif" font-size="210" font-weight="900">${escapeSvg(icon)}</text>
</svg>`.trim();

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
