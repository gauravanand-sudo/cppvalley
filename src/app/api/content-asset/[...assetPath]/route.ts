import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");
const ALLOWED_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function getContentType(ext: string) {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ assetPath: string[] }> }
) {
  const { assetPath } = await params;
  const relativePath = assetPath.join("/");
  const normalized = path.normalize(relativePath);
  const absolutePath = path.join(CONTENT_ROOT, normalized);
  const ext = path.extname(absolutePath).toLowerCase();

  if (
    !absolutePath.startsWith(CONTENT_ROOT) ||
    !ALLOWED_EXTENSIONS.has(ext) ||
    !fs.existsSync(absolutePath)
  ) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = fs.readFileSync(absolutePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": getContentType(ext),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
