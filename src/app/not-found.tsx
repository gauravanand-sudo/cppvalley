import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="page-shell minimal-site">
      <SiteHeader />
      <main className="not-found-shell site-container">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <div className="action-row">
          <Link className="button button-primary" href="/">Home</Link>
          <Link className="button button-secondary" href="/curriculum">Curriculum</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
