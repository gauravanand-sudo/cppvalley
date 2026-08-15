import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="page-shell single-course-page">
      <SiteHeader />
      <main className="not-found-shell page-width">
        <p className="course-kicker">404 · PAGE NOT FOUND</p>
        <h1>This page is not part of the course.</h1>
        <p>Return to HFT Core Systems or open the complete curriculum.</p>
        <div className="course-hero-actions">
          <Link className="course-button course-button-primary" href="/">Back to the course</Link>
          <Link className="course-button course-button-secondary" href="/curriculum">View curriculum</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
