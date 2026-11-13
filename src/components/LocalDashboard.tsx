"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { eliteCourses } from "@/data/elite-courses";
import { courseLessons, lessonsByCourse } from "@/data/course-lessons";
import { problemBank, problemBankStats } from "@/data/problem-bank";
import { getSupabaseClient } from "@/lib/supabase-client";
import { ProfileSettings } from "@/components/ProfileSettings";

type CloudState = "loading" | "guest" | "connected" | "unavailable";
type RecentSubmission = { problem_slug: string; verdict: string; created_at: string };

function readLocal(key: string): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.filter(item => typeof item === "string") : [];
  } catch { return []; }
}

export function LocalDashboard() {
  const [localSolved, setLocalSolved] = useState<string[]>([]);
  const [localReviewed, setLocalReviewed] = useState<string[]>([]);
  const [cloudSolved, setCloudSolved] = useState<string[]>([]);
  const [cloudReviewed, setCloudReviewed] = useState<string[]>([]);
  const [recent, setRecent] = useState<RecentSubmission[]>([]);
  const [cloudState, setCloudState] = useState<CloudState>("loading");
  const [email, setEmail] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLocalSolved(readLocal("cppvalley-practice-solved-v1"));
    setLocalReviewed(readLocal("cppvalley-lesson-progress-v1"));
    setHydrated(true);

    const client = getSupabaseClient();
    if (!client) {
      setCloudState("unavailable");
      return;
    }

    const sync = async () => {
      try {
        const identity = await client.auth.getUser();
        if (cancelled) return;
        const user = identity.data.user;
        if (!user) {
          setCloudState("guest");
          setEmail("");
          return;
        }
        setEmail(user.email || "");
        const [submissionResult, progressResult, recentResult] = await Promise.all([
          client.from("practice_submissions").select("problem_slug")
            .eq("user_id", user.id).eq("verdict", "Accepted").limit(2000),
          client.from("lesson_progress").select("course_slug,lesson_slug")
            .eq("user_id", user.id).limit(2000),
          client.from("practice_submissions").select("problem_slug,verdict,created_at")
            .eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        ]);
        if (cancelled) return;
        if (submissionResult.error || progressResult.error || recentResult.error) {
          setCloudState("unavailable");
          return;
        }
        const accepted = new Set((submissionResult.data || [])
          .map(row => row.problem_slug)
          .filter((slug): slug is string => typeof slug === "string"));
        const lessons = new Set((progressResult.data || [])
          .filter(row => typeof row.course_slug === "string" && typeof row.lesson_slug === "string")
          .map(row => row.course_slug + "/" + row.lesson_slug));
        const cleanRecent = (recentResult.data || []).filter((row): row is RecentSubmission =>
          typeof row.problem_slug === "string" &&
          typeof row.verdict === "string" &&
          typeof row.created_at === "string");
        setCloudSolved([...accepted]);
        setCloudReviewed([...lessons]);
        setRecent(cleanRecent);
        setCloudState("connected");
      } catch {
        if (!cancelled) setCloudState("unavailable");
      }
    };

    void sync();
    const listener = client.auth.onAuthStateChange(() => {
      // Queries are read-only and scoped by Supabase Row Level Security.
      void sync();
    });
    return () => {
      cancelled = true;
      listener.data.subscription.unsubscribe();
    };
  }, []);

  const acceptedSlugs = useMemo(
    () => new Set(cloudState === "connected" ? cloudSolved : localSolved),
    [cloudSolved, cloudState, localSolved],
  );
  const reviewedIds = useMemo(
    () => new Set(cloudState === "connected" ? cloudReviewed : localReviewed),
    [cloudReviewed, cloudState, localReviewed],
  );
  const verified = problemBank.filter(p => p.status === "runnable" && acceptedSlugs.has(p.slug));
  const reviewed = courseLessons.filter(l => reviewedIds.has(l.courseSlug + "/" + l.slug));
  const isCloud = cloudState === "connected";

  return <div className="cv-shell">
    <div className="cv-page-intro">
      <span className="cv-eyebrow">MY CPPVALLEY</span>
      <h1>Your engineering learning dashboard</h1>
      <p>Track your C++, GPU and AI systems course outlines, verified CPU coding submissions and engineering progress.</p>
    </div>
    <div className={"cv-dashboard-alert " + (isCloud ? "cv-dashboard-cloud-connected" : "")} role="status">
      <strong>{isCloud ? "Account progress connected." :
        cloudState === "loading" ? "Checking your account…" :
        cloudState === "guest" ? "Local progress." : "Local progress fallback."}</strong>{" "}
      {isCloud ? "Showing server-verified submissions and lesson progress from your account." :
        cloudState === "guest" ? "Sign in to synchronize verified submissions across devices." :
        cloudState === "loading" ? "Your browser progress is still available." :
        "Cloud tables or account access are not configured on this deployment. Browser progress is still available."}
      {!isCloud && cloudState !== "loading" ? <Link href="/login">Sign in →</Link> : null}
      {isCloud && email ? <small>{email}</small> : null}
    </div>
    <div className="cv-dashboard-stats">
      <div><span>{isCloud ? "Verified problems solved" : "C++ problems solved on this device"}</span><strong>{hydrated ? verified.length : "—"}<small> / {problemBankStats.runnable}</small></strong></div>
      <div><span>Lesson outlines reviewed</span><strong>{hydrated ? reviewed.length : "—"}<small> / {courseLessons.length}</small></strong></div>
      <div><span>Curated problem topics</span><strong>{problemBankStats.total}</strong></div>
    </div>
    <ProfileSettings />
    <div className="cv-section-head"><div><span className="cv-eyebrow">COURSE PROGRESS</span><h2>Your ten engineering courses</h2></div><Link href="/courses">Browse courses →</Link></div>
    <div className="cv-dashboard-courses">
      {eliteCourses.map(course => {
        const lessons = lessonsByCourse.get(course.slug) || [];
        const done = lessons.filter(l => reviewedIds.has(l.courseSlug + "/" + l.slug)).length;
        const pct = lessons.length ? 100 * done / lessons.length : 0;
        return <Link className="cv-dashboard-course" href={"/courses/" + course.slug} key={course.slug}>
          <span className="cv-course-list-icon">{course.icon}</span>
          <div><h3>{course.title}</h3><span>{done} of {lessons.length} outlines reviewed</span><div className="cv-progress-bar"><i style={{ width: pct + "%" }} /></div></div><span>→</span>
        </Link>;
      })}
    </div>
    {isCloud && recent.length > 0 && <>
      <div className="cv-section-head"><div><span className="cv-eyebrow">YOUR SUBMISSIONS</span><h2>Recent verified runs</h2></div></div>
      <div className="cv-dashboard-achievements">
        {recent.map((item,index) => {
          const problem = problemBank.find(p => p.slug === item.problem_slug);
          if (!problem) return null;
          return <Link href={"/problems/" + problem.slug} key={item.problem_slug + item.created_at + index}>
            <span className={item.verdict === "Accepted" ? "" : "cv-verdict-error"}>{item.verdict === "Accepted" ? "✓" : "×"}</span>
            <strong>{problem.title}</strong>
            <small>{item.verdict}</small>
          </Link>;
        })}
      </div>
    </>}
    <div className="cv-section-head"><div><span className="cv-eyebrow">SOLVED CHALLENGES</span><h2>Your achievements</h2></div><Link href="/problems?status=runnable">Solve a problem →</Link></div>
    <div className="cv-dashboard-achievements">
      {verified.length ? verified.map(p => <Link key={p.slug} href={"/problems/" + p.slug}>
        <span>✓</span><strong>{p.title}</strong><small>{p.difficulty}</small>
      </Link>) : <p>No verified challenges recorded yet. Start with a runnable problem in the library.</p>}
    </div>
  </div>;
}
