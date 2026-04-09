// src/app/api/track/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireContent, parseTrackSyllabus } from "@/lib/content";
import { isPublicTrackSlug } from "@/lib/publicContent";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!isPublicTrackSlug(slug)) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    const track = requireContent("tracks", slug);
    const sections = parseTrackSyllabus(track.content);
    
    return NextResponse.json({
      sections,
      meta: track.meta
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Track not found" },
      { status: 404 }
    );
  }
}
