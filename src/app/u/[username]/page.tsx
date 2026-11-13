import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type Props = { params: Promise<{ username: string }> };
type PublicProfile = {
  username: string;
  display_name: string | null;
  created_at: string;
  leaderboard_opt_in: boolean;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: username + " — C++ Engineering Profile",
    description: "Public opt-in engineering profile on CppValley.",
    robots: { index: false, follow: false },
  };
}

/**
 * Client-anon Supabase key + database Row Level Security: only rows where
 * leaderboard_opt_in = TRUE may be returned to a non-owner.
 * Never return emails, source code, or unverified solution counts.
 */
async function getPublicProfile(username: string): Promise<PublicProfile | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !anon) return null;
  try {
    const url = new URL(base);
    if (url.protocol !== "https:") return null;
    const endpoint = new URL("/rest/v1/profiles",url.origin);
    endpoint.searchParams.set("select", "username,display_name,created_at,leaderboard_opt_in");
    endpoint.searchParams.set("username", "eq." + username);
    endpoint.searchParams.set("leaderboard_opt_in", "eq.true");
    endpoint.searchParams.set("limit", "1");
    const response = await fetch(endpoint, {
      headers: { apikey: anon, Authorization: "Bearer " + anon },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const rows = await response.json() as PublicProfile[];
    return rows[0]?.leaderboard_opt_in ? rows[0] : null;
  } catch { return null; }
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  if (!/^[a-z0-9_]{3,30}$/.test(username)) notFound();
  const profile = await getPublicProfile(username);
  if (!profile) {
    return <><SiteHeader/><main className="cv-subpage">
      <div className="cv-shell cv-coming-soon">
        <span className="cv-eyebrow">CPPVALLEY COMMUNITY</span>
        <h1>Profile unavailable</h1>
        <p>This username is either private, doesn't exist, or public profiles have not been enabled yet.</p>
        <Link className="cv-btn cv-btn-primary" href="/problems">Browse C++ problems →</Link>
      </div>
    </main><SiteFooter/></>;
  }
  return <><SiteHeader/><main className="cv-subpage">
    <div className="cv-shell cv-public-profile">
      <nav className="cv-mini-breadcrumb"><Link href="/problems">← C++ problems</Link><span>/</span><span>Community profile</span></nav>
      <section className="cv-white-card cv-public-profile-card">
        <div className="cv-public-avatar" aria-hidden="true">{profile.username[0].toUpperCase()}</div>
        <div>
          <span className="cv-eyebrow">PUBLIC CPPVALLEY PROFILE</span>
          <h1>{profile.display_name || profile.username}</h1>
          <p>@{profile.username}</p>
          <small>Member since {new Date(profile.created_at).toLocaleDateString("en", {year:"numeric",month:"short",timeZone:"UTC"})}</small>
        </div>
      </section>
      <div className="cv-editorial-note"><strong>Verified achievements are coming.</strong>
        <p>Public solution counts and competitive rankings will appear only after account-based judging, private test validation, and clear consent controls are ready. No scores are fabricated.</p>
        <Link href="/study-plans">Explore study plans →</Link>
      </div>
    </div>
  </main><SiteFooter/></>;
}
