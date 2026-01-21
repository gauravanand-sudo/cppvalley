// src/app/api/track/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireContent, parseTrackSyllabus } from "@/lib/content";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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