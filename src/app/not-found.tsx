import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="not-found-shell page-width">
        <p className="kicker">404 / PACKET DROPPED</p>
        <h1>This route left the hot path.</h1>
        <p>The page does not exist. The curriculum, projects, and hiring-proof checklist are still available.</p>
        <Link className="action action-primary" href="/curriculum">Open the curriculum →</Link>
      </main>
      <SiteFooter />
    </div>
  );
}
